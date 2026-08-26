import { Users } from "../models/Users";

export class UserMapper {
    static toResponse(user: Users) {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}