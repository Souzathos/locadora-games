import { Router } from "express";
import { GameController } from "../controllers/GameController";
import { validateBody } from "../middlewares/validateBody";
import { UpdateGameDTO } from "../dtos/game";

const gameRoutes = Router()
const controller = new GameController()

gameRoutes.get('/list', controller.list.bind(controller))
gameRoutes.post('/create', controller.create.bind(controller))
gameRoutes.patch('/update/:id', validateBody(UpdateGameDTO), controller.update.bind(controller))
gameRoutes.delete('/delete/:id', controller.delete.bind(controller))

export default gameRoutes