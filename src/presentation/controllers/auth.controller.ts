import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/useCases/auth/login.useCase';
import { RefreshTokenUseCase } from '../../application/useCases/auth/refreshToken.useCase';
import { LoginDto, RefreshTokenDto, JwtAccessTokenDto, JwtRefreshTokenDto } from '../../application/dtos/auth.dto';
import { AuthService } from '../../application/services/auth.service';
import { UserRepository } from '../../infrastructure';

export class AuthController {
    private loginUseCase: LoginUseCase;
    private refreshTokenUseCase: RefreshTokenUseCase;

    constructor() {
        this.loginUseCase = new LoginUseCase(new AuthService(new UserRepository()));
        this.refreshTokenUseCase = new RefreshTokenUseCase(new AuthService(new UserRepository()));
    }

    public async login(req: Request, res: Response): Promise<void> {
        const loginDto: LoginDto = req.body;
        try {
            const tokens: JwtAccessTokenDto = await this.loginUseCase.execute(loginDto);
            res.json(tokens);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Error desconocido' });
            }
        }    
    }

    public async refreshToken(req: Request, res: Response): Promise<void> {
        const refreshTokenDto: RefreshTokenDto = req.body;
        try {
            const refreshToken: JwtRefreshTokenDto = await this.refreshTokenUseCase.execute(refreshTokenDto);
            res.json(refreshToken);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Error desconocido' });
            }
        }    
    }
}
