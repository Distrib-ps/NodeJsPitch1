import express from "express";
import { clientsController } from "../controllers/clients.controller.js";

export const router = express.Router();

router.get('', clientsController.getAllHotel());
router.get('/rooms', clientsController.getAllRooms());
router.get('/rooms/:id', clientsController.getClientById());
router.post('/rooms/:clientId/rooms/:roomId/reserve', clientsController.reserveRoom());
router.delete('/rooms/:clientId/cancel-reservation', clientsController.cancelReservation());





export default router;
