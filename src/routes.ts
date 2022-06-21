import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./services/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "./services/CreateUser/CreateUserController";
import { RefreshTokenController } from "./services/RefreshToken/RefreshTokenController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

router.post('/users', createUserController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/refreshtoken', refreshTokenController.handle);

router.get('/courses', ensureAuthenticated, (request: Request,  response: Response) => {
    return response.json(
        [
            { id: 1, name: "NodeJs"},
            { id: 2, name: "ReactJs"},
            { id: 3, name: "React Native"},
        ]
    )
})

export { router };