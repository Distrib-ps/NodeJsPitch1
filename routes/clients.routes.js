import express from "express";
import { clientsController } from "../controllers/clients.controller.js";

export const router = express.Router();

router.get('', clientsController.getAllClients());




export default router;
