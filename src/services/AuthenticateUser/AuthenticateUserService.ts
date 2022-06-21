import { client } from '../../prisma/client';
import { compare } from 'bcryptjs';
import { generateJwtToken } from '../../helper/tokenHelper';
import { CreateRefreshTokenService } from '../CreateRefreshToken/CreateRefreshTokenService';

interface IAuthUser {
    username: string;
    password: string;
}

class AuthenticateUserService {
    async execute({username, password}:IAuthUser) {
        const userExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (!userExists) {
            throw new Error("User or Password is incorrect!");
        }

        const passwordMatch = await compare(password, userExists.password);

        if (!passwordMatch) {
            throw new Error("User or Password is incorrect!");
        }

        //Generate a JWT Token
        const token = generateJwtToken(userExists.id, "40s");

        //Generate Refresh Token
        const createRefreshToken = new CreateRefreshTokenService();
        const refreshToken = await createRefreshToken.execute(userExists.id);
        
        return { token, refreshToken };
    }
}

export { AuthenticateUserService };