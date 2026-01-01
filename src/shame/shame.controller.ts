import { Controller, Get, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ShameService } from './shame.service';
import { getClientIp } from 'request-ip';

@Controller()
export class ShameController {
  constructor(private readonly shameService: ShameService) { }

  @Get()
  getShame(
    @Req() req: Request,
    @Query('country') country?: string,
  ): {
    message: string;
    country: string;
    ip?: string;
    detectedFromIp?: boolean;
  } {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const clientIp = getClientIp(req) as string | null;
    let detectedCountry: string | null = null;
    const isLocalhost = clientIp === '::1' || clientIp === '127.0.0.1';

    if (clientIp && !isLocalhost) {
      detectedCountry = this.shameService.getCountryFromIp(clientIp);
    }


    let countryToUse: string | undefined =
      country || detectedCountry || undefined;
    if (!countryToUse && isLocalhost) {
      countryToUse = this.shameService.getRandomCountry();
    }

    const message = this.shameService.getShame(countryToUse);

    return {
      message,
      country: countryToUse || 'unknown',
      ...(clientIp && { ip: clientIp }),
      ...(detectedCountry &&
        !country &&
        !isLocalhost && { detectedFromIp: true }),
    } as {
      message: string;
      country: string;
      ip?: string;
      detectedFromIp?: boolean;
    };
  }
}
