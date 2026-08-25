import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router()
const controller = new UserController()

userRoutes.post('/create', controller.create.bind(controller))

export default userRoutes