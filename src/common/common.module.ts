import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { DBService } from './services/db.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddlewareGuard } from 'src/common/middleware/auth-guard';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';
import { ImageService } from './services/image.service';
import { ImagesController } from './controllers/images.controller';

@Module({
  imports: [
    JwtModule.register({
      secret:
        'hjfdsalhfdsahfjkdsakreaurceukfbukalsfyuej43243545y47988367+++fdsfjhdsifyhujdshfjkdsahfjkdskgfhjdsgfygsuyejkgfhdjgfsgejfgdjhsdgfhjsekfyhdbsyfjegfjdysgfjyefgydegfhjseyrfeyr63254342343',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LoginController, RegisterController, ImagesController],
  providers: [
    LoginService,
    RegisterService,
    DBService,
    JwtMiddlewareGuard,
    ImageService,
  ],
  exports: [DBService, JwtMiddlewareGuard, JwtModule],
})
export class CommonModule {}
