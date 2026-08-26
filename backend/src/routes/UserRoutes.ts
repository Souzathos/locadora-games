import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router()
const controller = new UserController()

userRoutes.post('/create', controller.create.bind(controller))
userRoutes.get('/list', controller.list.bind(controller))
userRoutes.get('/show/:id', controller.showById.bind(controller))
userRoutes.get('/show', controller.showByEmail.bind(controller))
userRoutes.patch('/update/:id', controller.update.bind(controller))

export default userRoutes