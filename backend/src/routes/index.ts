import { Router } from "express";
import userRoutes from "./UserRoutes";
import authRoutes from "./authRoutes";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
export default routes