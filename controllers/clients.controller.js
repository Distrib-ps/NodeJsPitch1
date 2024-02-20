import { clientService } from "../services/clients.service.js";

class ClientsController {
  constructor() {
    this.clientService = clientService;
  }

  getAllClients() {
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
}

export const clientsController = new ClientsController();
