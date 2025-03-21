import { AuthService } from '../../services/auth.service';
import { RefreshTokenDto, JwtTokenDto } from '../../dtos/auth.dto';

export class RefreshTokenUseCase {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async execute(refreshTokenDto: RefreshTokenDto): Promise<JwtTokenDto> {
        return this.authService.refreshToken(refreshTokenDto);
    }
}
