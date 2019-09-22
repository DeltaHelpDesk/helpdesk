import { Controller, Post, Header, Body } from '@nestjs/common';
import { LoginDto } from './DTOs/LoginDto';
import { AutoJobService } from './autojob.services';

@Controller('autojob')
export class AutoJobController {
    constructor(
        private readonly autoService: AutoJobService,
    ) { }

    @Post('clearexpiredtokens')
    @Header('Cache-Control', 'none')
    async clearExpiredTokens(@Body() loginDto: LoginDto): Promise<boolean> {
        if (!loginDto) {
            return false;
        }
        const { username, password } = loginDto;
        if (!this.autoService.checkLogin(username, password)) {
            return false;
        }
        const res = await this.autoService.clearExpiredTokens();
        return res;
    }
}