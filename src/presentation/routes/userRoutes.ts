import { Router } from 'express';
// import { UserService } from '../../infrastructure/users/userService';

const createUserRoutes = (/* userService: UserService */) => {
    const router = Router();

    router.get('/', async (req, res) => {
        try {
            // const users = await userService.getAllUsers();
            res.json({ message: 'Esta ruta lista todos los usuarios' });
        } catch (error: any) {
            console.error('Error:', error);
            res.status(500).json({ error: `Error: ${error.message}` });
        }
    });

    return router;
};

export default createUserRoutes;
