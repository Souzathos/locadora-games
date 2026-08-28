import { Router } from "express";

const gameRoutes = Router()
const controller = new GameController()

gameRoutes.post('/create', controller.register.bind(controller))

export default gameRoutes