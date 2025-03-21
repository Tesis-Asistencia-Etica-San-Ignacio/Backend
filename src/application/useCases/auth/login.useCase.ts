import { AuthService } from '../../services/auth.service';
import { LoginDto, JwtAccessTokenDto } from '../../dtos/auth.dto';

export class LoginUseCase {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async execute(loginDto: LoginDto): Promise<JwtAccessTokenDto> {
        return this.authService.login(loginDto);
    }
}
