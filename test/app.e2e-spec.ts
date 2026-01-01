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
        expect(typeof res.body.message).toBe('string');
        expect(res.body.message.length).toBeGreaterThan(0);
      });
  });

  it('/?country=usa (GET) - should return USA-specific shame message', () => {
    return request(app.getHttpServer())
      .get('/?country=usa')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country', 'usa');
        expect(typeof res.body.message).toBe('string');
        expect(res.body.message.toLowerCase()).toContain('shame');
      });
  });

  it('/?country=india (GET) - should return India-specific shame message', () => {
    return request(app.getHttpServer())
      .get('/?country=india')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country', 'india');
        expect(typeof res.body.message).toBe('string');
      });
  });

  it('/?country=invalid (GET) - should return fallback message for invalid country', () => {
    return request(app.getHttpServer())
      .get('/?country=invalid')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country', 'invalid');
        expect(res.body.message).toContain('not recognized');
      });
  });

  it('/ (GET) - should include IP address in response', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('ip');
        expect(typeof res.body.ip).toBe('string');
      });
  });

  it('/?country=china (GET) - should handle country with spaces', () => {
    return request(app.getHttpServer())
      .get('/?country=south-korea')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('country');
        expect(typeof res.body.message).toBe('string');
      });
  });
});
