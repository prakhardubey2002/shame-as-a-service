import { Controller, Get, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ShameService } from './shame.service';
import * as requestIp from 'request-ip';

@Controller()
export class ShameController {
  constructor(private readonly shameService: ShameService) { }

  @Get()
  getShame(
    @Req() req: Request,
    @Query('country') country?: string,
  ): { message: string; country: string; ip?: string; detectedFromIp?: boolean } {
    // Always detect country from IP first
    const clientIp = requestIp.getClientIp(req);
    let detectedCountry: string | null = null;
    const isLocalhost = clientIp === '::1' || clientIp === '127.0.0.1';

    if (clientIp && !isLocalhost) {
      detectedCountry = this.shameService.getCountryFromIp(clientIp);
    }

    // Use provided country parameter as override, otherwise use detected country
    // For localhost, use a random country for testing purposes
    let countryToUse: string | undefined = country || detectedCountry || undefined;
    if (!countryToUse && isLocalhost) {
      countryToUse = this.shameService.getRandomCountry();
    }

    const message = this.shameService.getShame(countryToUse);

    return {
      message,
      country: countryToUse || 'unknown',
      ...(clientIp && { ip: clientIp }),
      ...(detectedCountry && !country && !isLocalhost && { detectedFromIp: true }),
    };
  }
}
