import { Rentals } from "../models/Rentals";
import { UserMapper } from "./UserMapper";

export class RentMapper {
    static toResponse(rental: Rentals) {
        return {
            id: rental.id,
            game: rental.game,
            user: UserMapper.toResponse(rental.user),
            rentedAt: rental.rented_at,
            dueDate: rental.due_date,
            returnedAt: rental.returned_at,
            pricePaid: rental.price_paid

        }
    }
}