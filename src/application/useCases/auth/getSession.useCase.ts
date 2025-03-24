import { AuthService } from '../../services/auth.service';

export class GetSessionUseCase {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async execute(token: string): Promise<{ userType: string }> {
        return this.authService.getSession(token);
    }
}
