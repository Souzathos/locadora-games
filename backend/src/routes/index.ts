import { Router } from "express";
import userRoutes from "./UserRoutes";
import authRoutes from "./authRoutes";
import gameRoutes from "./GameRoutes";
import rentRoutes from "./rentRoutes";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/game', gameRoutes)
routes.use('/rent', rentRoutes)

export default routes