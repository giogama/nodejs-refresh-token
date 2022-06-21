import { Request, Response } from 'express';
import { CreateUserService } from './CreateUserService';

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, username, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name, 
            username, 
            password
        });

        return response.json(user);
    }
}

export { CreateUserController };