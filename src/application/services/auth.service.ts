import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { LoginDto, RefreshTokenDto, JwtTokensDto } from '../dtos/auth.dto';
import config from '../../infrastructure/config';

export class AuthService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    // Login - Solo devuelve access token
    public async login(loginDto: LoginDto): Promise<JwtTokensDto> {
        const { email, password } = loginDto;

        // Verificar el usuario por email
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Crear el JWT (access token)
        const payload = { id: user.id, type: user.type };
        const accessToken = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.tokenExpiresIn });
        const refreshToken = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.refreshExpiresTokenIn });

        return {
            accessToken,
            refreshToken,
            userType: user.type,
        };
    }

    // Refresh Token - Solo devuelve refresh token
    public async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<JwtTokensDto> {
        const { refreshToken } = refreshTokenDto;

        try {
            // Verificar el refresh token
            const decoded: any = jwt.verify(refreshToken, config.jwt.secret);

            // Crear un nuevo Access Token
            const newAccessToken = jwt.sign(decoded, config.jwt.secret, { expiresIn: config.jwt.tokenExpiresIn });
            // Crear un nuevo refresh token
            const newRefreshToken = jwt.sign(decoded, config.jwt.secret, { expiresIn: config.jwt.refreshExpiresTokenIn });

            // Devolver solo el refresh token
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                userType: decoded.type,
            };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    public async getSession(token: string): Promise<{ userType: string }> {
        try {
            // Verifica el token y extrae el payload
            const decoded: any = jwt.verify(token, config.jwt.secret);
            return { userType: decoded.type };
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
