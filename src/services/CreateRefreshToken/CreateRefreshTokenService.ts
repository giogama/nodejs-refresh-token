import dayjs from 'dayjs';
import { generateJwtToken } from '../../helper/tokenHelper';

class CreateRefreshTokenService {
    async execute(userId: string) {
        const expiresIn: string = dayjs().add(1, 'month').unix().toString();

        const refreshToken = generateJwtToken(userId, expiresIn, "RT");

        return refreshToken;
    }
}

export {CreateRefreshTokenService};