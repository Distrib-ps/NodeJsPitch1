import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Hotel {
  constructor(hotelData, clientsData) {
    this.hotelData = hotelData;
    this.clientsData = clientsData;
  }

  getAllClients() {
    return this.clientsData.clients;
  }

  getClientById(clientId) {
    return this.clientsData.clients.find(client => client.id === clientId);
  }

  createClient(newClient) {
    newClient.id = this.clientsData.clients.length + 1;
    this.clientsData.clients.push(newClient);
    this.saveClientsData();
    return newClient;
  }

  updateClient(clientId, updatedClient) {
    const index = this.clientsData.clients.findIndex(client => client.id === clientId);

    if (index !== -1) {
      this.clientsData.clients[index] = { ...this.clientsData.clients[index], ...updatedClient };
      this.saveClientsData();
      return this.clientsData.clients[index];
    }

    return null;
  }

  reserveRoom(clientId, roomId) {
    const client = this.getClientById(clientId);
    if (client) {
      client.roomId = roomId;
      this.saveClientsData();
      return client;
    }
    return null;
  }

  cancelRoomReservation(clientId, roomId) {
    const client = this.getClientById(clientId);
    if (client) {
      client.roomId = null;
      this.saveClientsData();
      return client;
    }
    return null;
  }

  loadClientsData() {
    try {
      const data = fs.readFileSync(path.resolve(__dirname, "../data/clients.json"), 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Erreur de lecture du fichier clients.json :', err);
      throw err;
    }
  }

  saveClientsData() {
    try {
      fs.writeFileSync(path.resolve(__dirname, "../data/clients.json"), JSON.stringify(this.clientsData, null, 2), 'utf8');
      console.log('Données clients mises à jour avec succès.');
    } catch (err) {
      console.error('Erreur d\'écriture dans le fichier clients.json :', err);
      throw err;
    }
  }
}

class HotelService {
  constructor() {
    this.hotel = this.loadHotelData();
  }

  loadHotelData() {
    const hotelData = this.loadJsonFile(path.resolve(__dirname, "../data/hotel.json"));
    const clientsData = this.loadJsonFile(path.resolve(__dirname, "../data/clients.json"));
    return new Hotel(hotelData, clientsData);
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

  getClients(){
    return this.hotel.getAllClients();
  }

    getClientById(clientId){
        return this.hotel.getClientById(clientId);
    }

    createClient(newClient){
        return this.hotel.createClient(newClient);
    }

    updateClient(clientId, updatedClient){
        return this.hotel.updateClient(clientId, updatedClient);
    }
    reserveRoom(clientId, roomId){
        return this.hotel.reserveRoom(clientId, roomId);
    }
    cancelRoomReservation(clientId, roomId){
        return this.hotel.cancelRoomReservation(clientId, roomId);
    }
}

export const hotelService = new HotelService();