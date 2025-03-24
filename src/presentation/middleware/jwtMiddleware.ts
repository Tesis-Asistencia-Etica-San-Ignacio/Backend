import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../infrastructure/config';

// permite los roles que le pases en el array "roles"
export const validateRoleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): Response | void => {
        // Extraer token del header "Authorization: Bearer <token>"
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        try {
            // Verificar el token
            const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

            // Extraer rol (type) y verificar contra el array de roles permitidos
            const userRole = decoded.type;
            if (!roles.includes(userRole)) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
    };
};

//  valida que el rol sea INVESTIGADOR o EVALUADOR
export const validateInvestigatorOrEvaluatorMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction): Response | void => {
        // Extraer token del header "Authorization: Bearer <token>"
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        try {
            // Verificar el token
            const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

            // Extraer rol (type)
            const userRole = decoded.type;

            // Verificar que el rol sea INVESTIGADOR o EVALUADOR
            if (userRole !== 'INVESTIGADOR' && userRole !== 'EVALUADOR') {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
    };
};
