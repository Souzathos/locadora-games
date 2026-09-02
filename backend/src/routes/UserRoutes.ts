import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user";
import { validateBody } from "../middlewares/validateBody";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRoutes = Router()
const controller = new UserController()

userRoutes.post('/create', validateBody(CreateUserDTO), controller.create.bind(controller))
userRoutes.get('/list', controller.list.bind(controller))
userRoutes.get('/show/:id', controller.showById.bind(controller))
userRoutes.get('/show', controller.showByEmail.bind(controller))
userRoutes.patch('/update/:id', authMiddleware, validateBody(UpdateUserDTO), controller.update.bind(controller))
userRoutes.delete('/delete/:id', authMiddleware, controller.delete.bind(controller))
userRoutes.get('/rentals/:id', authMiddleware, controller.showUserRentals.bind(controller))
userRoutes.get('/current-rentals/:id', authMiddleware, controller.showCurrentUserRentals.bind(controller))


export default userRoutes