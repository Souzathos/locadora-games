import { Router } from "express";
import { RentController } from "../controllers/RentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const rentRoutes = Router()
const controller =  new RentController()

rentRoutes.post('/:id', authMiddleware, controller.rent.bind(controller))
rentRoutes.post('/return/:id', authMiddleware,  controller.return.bind(controller))
rentRoutes.get('/show', authMiddleware, adminMiddleware, controller.show.bind(controller))
rentRoutes.get('/show-late', authMiddleware, adminMiddleware, controller.showLate.bind(controller))
rentRoutes.get('/show-current', authMiddleware, adminMiddleware, controller.showCurrent.bind(controller))

export default rentRoutes