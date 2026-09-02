import { Router } from "express";
import { GameController } from "../controllers/GameController";
import { validateBody } from "../middlewares/validateBody";
import { CreateGameDTO, UpdateGameDTO } from "../dtos/game";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const gameRoutes = Router()
const controller = new GameController()

gameRoutes.get('/list', authMiddleware, adminMiddleware, controller.list.bind(controller))
gameRoutes.post('/create', authMiddleware, adminMiddleware, validateBody(CreateGameDTO), controller.create.bind(controller))
gameRoutes.patch('/update/:id', authMiddleware, adminMiddleware, validateBody(UpdateGameDTO), controller.update.bind(controller))
gameRoutes.delete('/delete/:id', authMiddleware, adminMiddleware, controller.delete.bind(controller))

export default gameRoutes