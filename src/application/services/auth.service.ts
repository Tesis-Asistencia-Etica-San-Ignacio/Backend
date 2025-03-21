import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { LoginDto, RefreshTokenDto, JwtAccessTokenDto, JwtRefreshTokenDto } from '../dtos/auth.dto';
import config from '../../infrastructure/config';

export class AuthService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    // Login - Solo devuelve access token
    public async login(loginDto: LoginDto): Promise<JwtAccessTokenDto> {
        const { email, password } = loginDto;

        // Verificar el usuario por email
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Crear el JWT (access token)
        const payload = { id: user.id, type: user.type };
        const accessToken = jwt.sign(payload, config.jwt.secret, { expiresIn: parseInt(config.jwt.tokenExpiresIn, 10) });

        // Solo devolvemos el access token, no el refresh token
        return {
            accessToken,
        };
    }

    // Refresh Token - Solo devuelve refresh token
    public async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<JwtRefreshTokenDto> {
        const { refreshToken } = refreshTokenDto;

        try {
            // Verificar el refresh token
            const decoded: any = jwt.verify(refreshToken, config.jwt.secret);

            // Crear un nuevo refresh token
            const newRefreshToken = jwt.sign({ id: decoded.id, type: decoded.type }, config.jwt.secret, { expiresIn: parseInt(config.jwt.refreshExpiresTokenIn, 10) });

            // Devolver solo el refresh token
            return {
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
}
