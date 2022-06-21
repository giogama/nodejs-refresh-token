import { Request, Response } from "express";
import { AuthenticateUserService } from "./AuthenticateUserService";

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { username, password } = request.body;

        const authenticaUserService = new AuthenticateUserService();

        const token = await authenticaUserService.execute({
            username,
            password,
        });

        return response.json(token);
    }
}

export { AuthenticateUserController };