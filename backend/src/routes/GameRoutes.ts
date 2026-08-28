import { Router } from "express";
import { GameController } from "../controllers/GameController";

const gameRoutes = Router()
const controller = new GameController()

gameRoutes.post('/create', controller.register.bind(controller))

export default gameRoutes