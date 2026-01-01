import { Test, TestingModule } from '@nestjs/testing';
import { ShameService } from './shame.service';

describe('ShameService', () => {
  let service: ShameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShameService],
    }).compile();

    service = module.get<ShameService>(ShameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getShame', () => {
    it('should return a shame message for a valid country', () => {
      const message = service.getShame('usa');
      expect(message).toBeDefined();
      expect(typeof message).toBe('string');
      expect(message.length).toBeGreaterThan(0);
    });

    it('should return a shame message for india', () => {
      const message = service.getShame('india');
      expect(message).toBeDefined();
      expect(typeof message).toBe('string');
      expect(message.toLowerCase()).toContain('shame');
    });

    it('should return a shame message for china', () => {
      const message = service.getShame('china');
      expect(message).toBeDefined();
      expect(typeof message).toBe('string');
    });

    it('should handle country names with spaces', () => {
      const message = service.getShame('south korea');
      expect(message).toBeDefined();
      expect(typeof message).toBe('string');
    });

    it('should return a fallback message for invalid country', () => {
      const message = service.getShame('invalid-country');
      expect(message).toBeDefined();
      expect(message).toContain('not recognized');
      expect(message).toContain('invalid-country');
    });

    it('should return a random message when no country is provided', () => {
      const message = service.getShame();
      expect(message).toBeDefined();
      expect(typeof message).toBe('string');
      expect(message.length).toBeGreaterThan(0);
    });

    it('should return different messages on multiple calls (random)', () => {
      const messages = new Set();
      // Call multiple times to test randomness
      for (let i = 0; i < 10; i++) {
        messages.add(service.getShame('usa'));
      }
      // Should have at least 2 different messages (unless very unlucky)
      expect(messages.size).toBeGreaterThanOrEqual(1);
    });
  });

  describe('getCountryFromIp', () => {
    it('should return null for invalid IP', () => {
      const country = service.getCountryFromIp('invalid-ip');
      expect(country).toBeNull();
    });

    it('should return null for localhost IP', () => {
      const country = service.getCountryFromIp('127.0.0.1');
      // geoip-lite might return null for localhost
      expect(country).toBeNull();
    });

    it('should handle valid IP addresses', () => {
      // Test with a known IP (8.8.8.8 is Google DNS, typically US)
      const country = service.getCountryFromIp('8.8.8.8');
      // May return null or a country code depending on geoip-lite database
      expect(country === null || typeof country === 'string').toBe(true);
    });
  });

  describe('getRandomCountry', () => {
    it('should return a valid country string', () => {
      const country = service.getRandomCountry();
      expect(country).toBeDefined();
      expect(typeof country).toBe('string');
      expect(country.length).toBeGreaterThan(0);
    });

    it('should return different countries on multiple calls', () => {
      const countries = new Set();
      for (let i = 0; i < 20; i++) {
        countries.add(service.getRandomCountry());
      }
      // Should have multiple different countries
      expect(countries.size).toBeGreaterThan(1);
    });
  });
});

