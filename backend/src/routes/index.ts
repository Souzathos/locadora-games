import { Router } from "express";
import userRoutes from "./UserRoutes";
import authRoutes from "./authRoutes";
import gameRoutes from "./GameRoutes";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/game', gameRoutes)
export default routes