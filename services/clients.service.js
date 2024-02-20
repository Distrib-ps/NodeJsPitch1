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
    return this.hotelData.name;
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
}

export const clientService = new ClientService();