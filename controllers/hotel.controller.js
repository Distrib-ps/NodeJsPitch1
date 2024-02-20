import { hotelService } from "../services/bookingHotel.service.js";

class ClientsController {
  constructor() {
    this.hotelService = hotelService;
  }

  getAllClients() {
    return async (req, res) => {
      try {
        const clients = await this.hotelService.getClients();
        res.send(clients);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }

  getClientById() {
    return async (req, res) => {
      const clientId = parseInt(req.params.id);
      try {
        const client = await this.hotelService.getClientById(clientId);
        if (client) {
          res.json(client);
        } else {
          res.status(404).json({ error: 'Client not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }

  createClient() {
    return async (req, res) => {
      const newClient = req.body;
      if (!newClient.name || !newClient.email || !newClient.phone) {
        res.status(400).json({ error: 'Missing parameters!!!!' });
        return;
      }

      try {
        const createdClient = await this.hotelService.createClient(newClient);
        res.json({ message: 'Client ajouté avec succès', client: createdClient });
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }

  updateClient() {
    return async (req, res) => {
      const clientId = parseInt(req.params.id);
      const updatedClientData = req.body;

      try {
        const updatedClient = await this.hotelService.updateClient(clientId, updatedClientData);
        if (updatedClient) {
          res.json({ message: `Informations du client ${clientId} mises à jour avec succès`, updatedClient });
        } else {
          res.status(404).json({ error: 'Client not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }

  reserveRoom() {
    return async (req, res) => {
      const clientId = parseInt(req.params.id);
      const roomId = parseInt(req.params.roomId);
      
      try {
        const reservedClient = await this.hotelService.reserveRoom(clientId, roomId);
        if (reservedClient) {
          res.json({ message: `Chambre réservée avec succès pour le client ${clientId} pour la chambre ${roomId}` });
        } else {
          res.status(404).json({ error: 'Client not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }

  cancelRoomReservation() {
    return async (req, res) => {
      const clientId = parseInt(req.params.id);
      const roomId = parseInt(req.params.roomId);
      
      try {
        const reservedClient = await this.hotelService.cancelRoomReservation(clientId, roomId);
        if (reservedClient) {
          res.json({ message: `Réservation annulée avec succès pour le client ${clientId} pour la chambre ${roomId}` });
        } else {
          res.status(404).json({ error: 'Client not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }
}

export const hotelsController = new ClientsController();
