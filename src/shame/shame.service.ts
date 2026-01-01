import { Injectable } from '@nestjs/common';
import * as shameQuotes from './shame-quotes.json';
import * as geoip from 'geoip-lite';

@Injectable()
export class ShameService {
  private quotes = shameQuotes as Record<string, string[]>;

  private countryCodeMap: Record<string, string> = {
    US: 'usa',
    IN: 'india',
    CN: 'china',
    GB: 'uk',
    DE: 'germany',
    JP: 'japan',
    BR: 'brazil',
    RU: 'russia',
    FR: 'france',
    CA: 'canada',
    AU: 'australia',
    KR: 'south-korea',
    MX: 'mexico',
    ES: 'spain',
    IT: 'italy',
    PL: 'poland',
  };

  getCountryFromIp(ip: string): string | null {
    try {
      const geo = geoip.lookup(ip);
      if (geo && geo.country) {
        return this.countryCodeMap[geo.country] || null;
      }
    } catch {
      // Ignore errors, return null
    }
    return null;
  }

  getRandomCountry(): string {
    const countries = Object.keys(this.quotes);
    return countries[Math.floor(Math.random() * countries.length)];
  }

  getShame(country?: string): string {
    if (!country) {
      const randomCountry = this.getRandomCountry();
      const countryQuotes = this.quotes[randomCountry];
      return countryQuotes[Math.floor(Math.random() * countryQuotes.length)];
    }

    const normalizedCountry = country.toLowerCase().replace(/\s+/g, '-');
    const countryQuotes = this.quotes[normalizedCountry];

    if (!countryQuotes) {
      return `Shame! Your country code '${country}' is not recognized - even your API calls are broken!`;
    }

    return countryQuotes[Math.floor(Math.random() * countryQuotes.length)];
  }
}
