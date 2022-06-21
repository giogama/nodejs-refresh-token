import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';

interface IUserRequest {
    name: string;
    username: string;
    password: string;
}

class CreateUserService {
    async execute({ name, username, password }:IUserRequest) {
        //Is user already exist?
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (userAlreadyExists) {
            throw new Error("User already exists.");
        }

        const hashedPassword = await hash(password, 8);

        //Insert new user
        const user = await client.user.create({
            data: {
                name,
                username,
                password: hashedPassword
            }
        });

        return user;
    }
}

export { CreateUserService };