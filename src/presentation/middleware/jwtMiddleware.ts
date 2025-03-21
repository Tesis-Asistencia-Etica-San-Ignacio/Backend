import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../infrastructure/config';
export const validateRoleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void | Response => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jwt.verify(token, config.jwt.secret ) as JwtPayload;
            const userRole = decoded.type;

            // Validar si el rol del usuario es uno de los roles permitidos
            if (!roles.includes(userRole)) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            // Si el rol es válido, se pasa a la siguiente función
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token inválido o expirado' });
        }
    };
};
