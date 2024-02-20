import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Client {
  constructor(hotelData, clientsData) {
    this.hotelData = hotelData;
    this.clientsData = clientsData;
  }

  getAllHotel() {
    return this.hotelData;
  }

  getAllRooms() {
    return this.hotelData.rooms;
  }

  getRoomById(id) {
    const roomId  = parseInt(id);
    return this.hotelData.rooms.find(room => room.id === roomId );
  }

  reserveRoom(clientId, roomId) {
    const client = this.clientsData.clients.find(client => client.id === clientId);
    if (!client) {
      throw new Error(`Client with ID ${clientId} not found.`);
    }
  
    const room = this.hotelData.rooms.find(room => room.id === roomId);
    if (!room) {
      throw new Error(`Room with ID ${roomId} not found.`);
    }
  
    if (room.reserved) {
      throw new Error(`Room with ID ${roomId} is already reserved.`);
    }
  
    client.reservedRoom = roomId;
    room.reserved = true;
  
    this.saveClientsData();
    this.saveHotelData();
  
    return { client, room };
  }
  
  cancelReservation(clientId) {
    const client = this.clientsData.clients.find(client => client.id === clientId);
    if (!client) {
      throw new Error(`Client with ID ${clientId} not found.`);
    }
  
    const roomId = client.reservedRoom;
    if (!roomId) {
      throw new Error(`Client with ID ${clientId} does not have a reserved room.`);
    }
  
    const room = this.hotelData.rooms.find(room => room.id === roomId);
    if (!room) {
      throw new Error(`Room with ID ${roomId} not found.`);
    }
  
    client.reservedRoom = null;
    room.reserved = false;
  
    this.saveClientsData();
    this.saveHotelData();
  
    return { client, room };
  }
  

  loadHotelData() {
    try {
      const data = fs.readFileSync(path.resolve(__dirname, "../data/hotel.json"), 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Erreur de lecture du fichier hotel.json :', err);
      throw err;
    }
  }

  saveHotelData() {
    try {
      fs.writeFileSync(path.resolve(__dirname, "../data/hotel.json"), JSON.stringify(this.clientsData, null, 2), 'utf8');
      console.log('Données hotel mises à jour avec succès.');
    } catch (err) {
      console.error('Erreur d\'écriture dans le fichier hotel.json :', err);
      throw err;
    }
  }
}

class ClientService {
  constructor() {
    this.client = this.loadClientData();
  }

  loadClientData() {
    const hotelDate = this.loadJsonFile(path.resolve(__dirname, "../data/hotel.json"));
    const clientsData = this.loadJsonFile(path.resolve(__dirname, "../data/clients.json"));
    return new Client(hotelDate, clientsData);
  }

  loadJsonFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error(`Erreur de lecture du fichier ${filePath} :`, err);
      throw err;
    }
  }

  getHotel(){
    return this.client.getAllHotel();
  }

  getAllRooms(){
    return this.client.getAllRooms();
  }

  getRoomById(id){
    return this.client.getRoomById(id);
  }

  reserveRoom(clientId, roomId){
    return this.client.reserveRoom(clientId, roomId);
  }

  cancelReservation(clientId){
    return this.client.cancelReservation(clientId);
  }
}

export const clientService = new ClientService();