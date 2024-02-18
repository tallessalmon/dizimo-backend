import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(username, pass) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const equalsPassword = await compare(pass, user.password || '');

    if (!equalsPassword) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      profile: user.profile,
      name: user.name,
      community: user.community,
    };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
