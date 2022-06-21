import { JwtHeader, sign } from 'jsonwebtoken';

export function generateJwtToken(subject: string, expiresIn: string, jwtType: string = "JWT") {
    //Generate a JWT Token
    const header: JwtHeader = {
        alg: "HS256",
        typ: jwtType
    };

    // const token = sign({}, process.env.JWT_SECRET, {
    //     subject: subject,
    //     expiresIn: expiresIn,
    //     header
    // });

    const token = sign({}, process.env.JWT_SECRET, {
        algorithm: "HS256",
        subject: subject,
        expiresIn: expiresIn,
        header        
    });

    return token;
}