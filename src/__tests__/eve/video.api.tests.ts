import request from 'supertest';
import { app } from '../../app';
import { Resolutions } from '../../videos/types/videos';


describe('/videos', () => {

  let createdVideoId: number;
  beforeAll(async () => {
    await request(app)
      .delete('/testing/all-data')
      .expect(204);
  });

  it('should return 200 and empty array', async () => {
    await request(app)
      .get('/videos')
      .expect(200, []);
  });


  it('should create a video and return 201',async()=>
  {
    const res = await request(app)
    .post('/videos/')
    .send({ title: 'Поедание каши под дулом автомата',
        author: 'Егор Зассульский',
        availableResolutions: ['P720'] })
    .expect(201);
    createdVideoId = res.body.id;
  }) 

 it('should return 404', async()=>{
    const res = await request(app)
    .put(`/videos/99999`)
    .send({
        title: 'Неудачный конкурс с кашей',
    author: "Проссульский",
    availableResolutions: ['P1080'],
    canBeDownloaded: true,
    minAgeRestriction: 18,
    publicationDate: new Date().toISOString()
    })
    .expect(404)
  })


 it('should return 400', async()=>{
    const res = await request(app)
    .put(`/videos/${createdVideoId}`)
    .send({
      title: 'Неудачный конкурс с кашей',
    author: "Проссульский",
    availableResolutions: ['P10810'],
    canBeDownloaded: true,
    minAgeRestriction: 18,
    publicationDate: new Date().toISOString()
    })
    .expect(400)
  })



  it('should update video by ID and return 204', async()=>{
    const updateData = {
      title: 'Неудачный конкурс с кашей',
    author: "Проссульский",
    availableResolutions: ['P1080'],
    canBeDownloaded: true,
    minAgeRestriction: 18,
    publicationDate: new Date().toISOString()
    }
    const res = await request(app)
    .put(`/videos/${createdVideoId}`)
    .send(updateData)
    .expect(204)

    const getRes = await request(app)
      .get(`/videos/${createdVideoId}`)
      .expect(200);
    expect(getRes.body.title).toBe(updateData.title);
    expect(getRes.body.author).toBe(updateData.author);
    expect(getRes.body.availableResolutions).toEqual(updateData.availableResolutions);
    expect(getRes.body.canBeDownloaded).toBe(updateData.canBeDownloaded);
    expect(getRes.body.minAgeRestriction).toBe(updateData.minAgeRestriction);
    expect(getRes.body.publicationDate).toBe(updateData.publicationDate);

  })


});