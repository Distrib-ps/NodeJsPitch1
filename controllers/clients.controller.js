import { clientService } from "../services/clients.service.js";

class ClientsController {
  constructor() {
    this.clientService = clientService;
  }

  getAllHotel() {
    return async (req, res) => {
      try {
        const hotel = await this.clientService.getHotel();
        console.log(hotel);
        res.send(hotel);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }

  getAllRooms() {
    return async (req, res) => {
      try {
        const rooms = await this.clientService.getAllRooms();
        console.log(rooms);
        res.send(rooms);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }

  getClientById() {
    return async (req, res) => {
      const roomId = parseInt(req.params.id);
      try {
        const rooms = await this.clientService.getRoomById(roomId);
        if (rooms) {
          res.json(rooms);
        } else {
          res.status(404).json({ error: 'Rooms not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    };
  }

  reserveRoom() {
    return async (req, res) => {
      const clientId = parseInt(req.params.clientId);
      const roomId = parseInt(req.params.roomId);
      try {
        const { client, room } = await this.clientService.reserveRoom(clientId, roomId);
        res.json({ message: `Chambre ${roomId} réservée avec succès pour le client ${clientId}`, client, room });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  }

  cancelReservation() {
    return async (req, res) => {
      const clientId = parseInt(req.params.clientId);
      try {
        const { client, room } = await this.clientService.cancelReservation(clientId);
        res.json({ message: `Réservation annulée avec succès pour le client ${clientId}`, client, room });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  }

}

export const clientsController = new ClientsController();
