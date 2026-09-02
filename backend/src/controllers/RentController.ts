import { Request, Response } from "express";
import { RentService } from "../services/RentService";
import { RentMapper } from "../mappers/RentMapper";
import { UnauthorizedError } from "../errors";

export class RentController {
    private service = new RentService()

    async rent (req: Request, res: Response) {
        const user = req.user
        if(!user) throw new UnauthorizedError()
        const rent = await this.service.rent(Number(req.params.id), Number(user.id))

        return res.status(200).json(rent)
    } 

    async return(req:Request, res:Response) {

        const user = req.user
        if(!user) throw new UnauthorizedError()
        
        
        const returnGame = await this.service.return(Number(req.params.id), Number(user.id))

        return res.status(200).json(returnGame)
    }

    async show(req:Request, res:Response) {
        const rentals = await this.service.show()

        return res.status(200).json(rentals.map((r) => RentMapper.toResponse(r)))
    }

    async showLate(req:Request, res:Response) {
        const lateRentals = await this.service.showLate()

        return res.status(200).json(lateRentals.map((r) => RentMapper.toResponse(r)))
    }

    async showCurrent(req:Request, res:Response) {
        const currentRentals = await this.service.showCurrent()

        return res.status(200).json(currentRentals.map((r) => RentMapper.toResponse(r)))
    }
}
