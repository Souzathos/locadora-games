import { Router } from "express";
import { GameController } from "../controllers/GameController";

const rentRoutes = Router()
const controller =  new GameController()

rentRoutes.post('/rent', controller.rent.bind(controller))
export default rentRoutes