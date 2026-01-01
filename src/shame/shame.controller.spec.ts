import { Test, TestingModule } from '@nestjs/testing';
import { ShameController } from './shame.controller';
import { ShameService } from './shame.service';
import { Request } from 'express';

describe('ShameController', () => {
    let controller: ShameController;
    let service: ShameService;

    const mockShameService = {
        getShame: jest.fn(),
        getCountryFromIp: jest.fn(),
        getRandomCountry: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShameController],
            providers: [
                {
                    provide: ShameService,
                    useValue: mockShameService,
                },
            ],
        }).compile();

        controller = module.get<ShameController>(ShameController);
        service = module.get<ShameService>(ShameService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getShame', () => {
        it('should return shame message with country from query parameter', () => {
            const mockRequest = {
                headers: {},
                connection: { remoteAddress: '192.168.1.1' },
                socket: { remoteAddress: '192.168.1.1' },
            } as unknown as Request;

            mockShameService.getShame.mockReturnValue('Test shame message');
            mockShameService.getCountryFromIp.mockReturnValue(null);

            const result = controller.getShame(mockRequest, 'usa');

            expect(result).toEqual({
                message: 'Test shame message',
                country: 'usa',
                ip: '192.168.1.1',
            });
            expect(mockShameService.getShame).toHaveBeenCalledWith('usa');
        });

        it('should detect country from IP when no query parameter provided', () => {
            const mockRequest = {
                headers: {},
                connection: { remoteAddress: '8.8.8.8' },
                socket: { remoteAddress: '8.8.8.8' },
            } as unknown as Request;

            mockShameService.getCountryFromIp.mockReturnValue('usa');
            mockShameService.getShame.mockReturnValue('Test shame message');

            const result = controller.getShame(mockRequest);

            expect(result).toEqual({
                message: 'Test shame message',
                country: 'usa',
                ip: '8.8.8.8',
                detectedFromIp: true,
            });
            expect(mockShameService.getCountryFromIp).toHaveBeenCalledWith('8.8.8.8');
            expect(mockShameService.getShame).toHaveBeenCalledWith('usa');
        });

        it('should use random country for localhost requests', () => {
            const mockRequest = {
                headers: {},
                connection: { remoteAddress: '127.0.0.1' },
                socket: { remoteAddress: '127.0.0.1' },
            } as unknown as Request;

            mockShameService.getRandomCountry.mockReturnValue('india');
            mockShameService.getShame.mockReturnValue('Test shame message');

            const result = controller.getShame(mockRequest);

            expect(result).toEqual({
                message: 'Test shame message',
                country: 'india',
                ip: '127.0.0.1',
            });
            expect(mockShameService.getRandomCountry).toHaveBeenCalled();
            expect(mockShameService.getShame).toHaveBeenCalledWith('india');
        });

        it('should use random country for IPv6 localhost', () => {
            const mockRequest = {
                headers: {},
                connection: { remoteAddress: '::1' },
                socket: { remoteAddress: '::1' },
            } as unknown as Request;

            mockShameService.getRandomCountry.mockReturnValue('china');
            mockShameService.getShame.mockReturnValue('Test shame message');

            const result = controller.getShame(mockRequest);

            expect(result).toEqual({
                message: 'Test shame message',
                country: 'china',
                ip: '::1',
            });
            expect(mockShameService.getRandomCountry).toHaveBeenCalled();
        });

        it('should prioritize query parameter over detected country', () => {
            const mockRequest = {
                headers: {},
                connection: { remoteAddress: '8.8.8.8' },
                socket: { remoteAddress: '8.8.8.8' },
            } as unknown as Request;

            mockShameService.getCountryFromIp.mockReturnValue('usa');
            mockShameService.getShame.mockReturnValue('Test shame message');

            const result = controller.getShame(mockRequest, 'india');

            expect(result).toEqual({
                message: 'Test shame message',
                country: 'india',
                ip: '8.8.8.8',
            });
            expect(mockShameService.getShame).toHaveBeenCalledWith('india');
            // getCountryFromIp might still be called but result won't be used
        });

        it('should return unknown country when no country can be determined', () => {
            const mockRequest = {
                headers: {},
                connection: { remoteAddress: '192.168.1.1' },
                socket: { remoteAddress: '192.168.1.1' },
            } as unknown as Request;

            mockShameService.getCountryFromIp.mockReturnValue(null);
            mockShameService.getShame.mockReturnValue('Test shame message');

            const result = controller.getShame(mockRequest);

            expect(result).toEqual({
                message: 'Test shame message',
                country: 'unknown',
                ip: '192.168.1.1',
            });
        });

        it('should not include detectedFromIp when country query parameter is provided', () => {
            const mockRequest = {
                headers: {},
                connection: { remoteAddress: '8.8.8.8' },
                socket: { remoteAddress: '8.8.8.8' },
            } as unknown as Request;

            mockShameService.getCountryFromIp.mockReturnValue('usa');
            mockShameService.getShame.mockReturnValue('Test shame message');

            const result = controller.getShame(mockRequest, 'india');

            expect(result.detectedFromIp).toBeUndefined();
        });
    });
});

