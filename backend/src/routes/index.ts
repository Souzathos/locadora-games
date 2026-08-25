import { Router } from "express";
import userRoutes from "./UserRoutes";

const routes = Router()

routes.use('/user', userRoutes)
export default routes