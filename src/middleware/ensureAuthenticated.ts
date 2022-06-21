import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const accessToken = request.headers.authorization;

    if (!accessToken) {
        return response.status(401).json({
            message: "Unauthorized"
        })
    }

    const [, token] = accessToken.split(" ");

    try {
        verify(token, process.env.JWT_SECRET);

        return next();
    } catch(err) {
        return response.status(401).json({
            message: "Token invalid."
        })
    }


}