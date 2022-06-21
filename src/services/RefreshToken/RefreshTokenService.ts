import { verify, decode } from 'jsonwebtoken';
import { generateJwtToken } from '../../helper/tokenHelper';
import { client } from '../../prisma/client';
import { CreateRefreshTokenService } from '../CreateRefreshToken/CreateRefreshTokenService';

class RefreshTokenService {
    async execute(refresh_token: string) {
        
        try {
            console.log('SECRET: ', process.env.JWT_SECRET);
            
            verify(refresh_token, process.env.JWT_SECRET);

            const decodedToken = decode(refresh_token, { complete: true});

            const jwtType = decodedToken.header.typ as string;

            if (jwtType !== 'RT') {
                throw new Error("Token type invalid");
            }

            const userId: string  = decodedToken.payload.sub as string;


            console.log('userId: ' + userId);

            const userExists = await client.user.findFirst({
                where: {
                    id: userId
                }
            });

            if (!userExists) {
                throw new Error("Refresh-Token invalid");
            }

            //Generate a JWT Token
        const token = generateJwtToken(userId, "20s");

        //Generate Refresh Token
        const createRefreshToken = new CreateRefreshTokenService();
        const refreshToken = await createRefreshToken.execute(userExists.id);
        
        return { token, refreshToken };

        } catch(err) {
            throw new Error("Refresh Token invalid");
        }
    }
}

export { RefreshTokenService };