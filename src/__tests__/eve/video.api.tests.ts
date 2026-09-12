import request from 'supertest';
import { app } from '../../app';

describe('/videos', () => {
  beforeEach(async () => {
    await request(app)
      .delete('/testing/all-data')
      .expect(204);
  });

  it('should return 200 and empty array', async () => {
    await request(app)
      .get('/videos')
      .expect(200, []);
  });
});