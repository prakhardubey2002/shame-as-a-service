import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('ShameController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) - should return shame message', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country');
        expect(typeof (res.body as { message: string }).message).toBe('string');
        expect(
          (res.body as { message: string }).message.length,
        ).toBeGreaterThan(0);
      });
  });

  it('/?country=usa (GET) - should return USA-specific shame message', () => {
    return request(app.getHttpServer())
      .get('/?country=usa')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country', 'usa');
        const body = res.body as { message: string; country: string };
        expect(typeof body.message).toBe('string');
        expect(body.message.toLowerCase()).toContain('shame');
      });
  });

  it('/?country=india (GET) - should return India-specific shame message', () => {
    return request(app.getHttpServer())
      .get('/?country=india')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country', 'india');
        const body = res.body as { message: string; country: string };
        expect(typeof body.message).toBe('string');
      });
  });

  it('/?country=invalid (GET) - should return fallback message for invalid country', () => {
    return request(app.getHttpServer())
      .get('/?country=invalid')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country', 'invalid');
        const body = res.body as { message: string; country: string };
        expect(body.message).toContain('not recognized');
      });
  });

  it('/ (GET) - should include IP address in response', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('ip');
        const body = res.body as { ip: string };
        expect(typeof body.ip).toBe('string');
      });
  });

  it('/?country=china (GET) - should handle country with spaces', () => {
    return request(app.getHttpServer())
      .get('/?country=south-korea')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country');
        const body = res.body as { message: string; country: string };
        expect(typeof body.message).toBe('string');
      });
  });
});
