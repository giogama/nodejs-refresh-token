import { Request, Response } from "express";
import { RefreshTokenService } from "./RefreshTokenService";

class RefreshTokenController {
    async handle(request: Request, response: Response) {
        const { refresh_token } = request.body;

        const refreshTokenService = new RefreshTokenService();

        const token = await refreshTokenService.execute(refresh_token);

        return response.json(token);
    }
}

export { RefreshTokenController };