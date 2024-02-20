import express from "express";
import { hotelsController } from "../controllers/hotel.controller.js";

export const router = express.Router();

router.get('', hotelsController.getAllClients());
router.get('/:id', hotelsController.getClientById());
router.post('/add', hotelsController.createClient());
router.put('/:id', hotelsController.updateClient());
router.post('/:id/reserve/:roomId', hotelsController.reserveRoom());
router.delete('/:id/cancelReservation/:roomId', hotelsController.cancelRoomReservation());




export default router;
