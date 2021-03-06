// npm packages
import request from 'supertest';

// our packages
import app from '../src/app';

export default (test) => {
  test('Should not create a classroom with no name', (t) => {
    request(app)
      .post('/api/classroom/create')
      .set('x-access-token', app.get('token'))
      .send({
        name: '',
        date: '2018-08-13',
        hour: '00:00'})
      .expect(400)
      .end((err, res) => {
        const expectedBody = {error: 'The classroom must have a name!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('The classroom must have a date from future', (t) => {
    request(app)
      .post('/api/classroom/create')
      .set('x-access-token', app.get('token'))
      .send({
        name: 'DAW',
        date: '2013-08-13',
        hour: '00:00'})
      .expect(400)
      .end((err, res) => {
        const expectedBody = {error: 'Date should be in the future!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('The date must have a correct format', (t) => {
    request(app)
      .post('/api/classroom/create')
      .set('x-access-token', app.get('token'))
      .send({
        name: 'DAW',
        date: '5 de enero',
        hour: '00:00'})
      .expect(400)
      .end((err, res) => {
        const expectedBody = {error: 'Date should be valid ISO Date!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });


  test('Should create a classroom with given data', (t) => {
    request(app)
      .post('/api/classroom/create')
      .set('x-access-token', app.get('token'))
      .send({
        name: 'test',
        date: '2018-08-13',
        hour: '00:00'})
      .end((err, res) => {
        const actualBody = res.body;
        t.error(err, 'No error');
        app.set('classroom', actualBody);
        t.end();
      });
  });


  // test('GET /api/classroom/:id', (t) => {
  //   request(app)
  //     .get(`/api/classroom/${app.get('classroom').id}`)
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       const expectedBody = app.get('classroom');
  //       const actualBody = res.body;
  //
  //       t.error(err, 'No error');
  //       t.deepEqual(actualBody, expectedBody, 'Retrieve user');
  //       t.notOk(actualBody.password, 'No password included');
  //       t.end();
  //     });
  // });


  // test('GET /api/classroom/:id', (t) => {
  //   request(app)
  //     .get(`/api/classroom/${app.get('classroom').id}`)
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       const expectedBody = app.get('classroom');
  //       const actualBody = res.body;
  //
  //       t.error(err, 'No error');
  //       t.deepEqual(actualBody, expectedBody, 'Retrieve classroom');
  //       t.notOk(actualBody.password, 'No password included');
  //       t.end();
  //     });
  // });

  // test('GET /api/user/me', (t) => {
  //   request(app)
  //     .get('/api/user/me')
  //     .set('x-access-token', app.get('token'))
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       const expectedBody = app.get('user');
  //       const actualBody = res.body;
  //
  //       t.error(err, 'No error');
  //       t.deepEqual(actualBody, expectedBody, 'Retrieve user');
  //       t.notOk(actualBody.password, 'No password included');
  //       t.end();
  //     });
  // });
  //
  // test('GET /api/user/:id with non-existent id', (t) => {
  //   request(app)
  //     .get('/api/user/12345')
  //     .set('x-access-token', app.get('token'))
  //     .expect(400)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       const expectedBody = {error: 'User does not exist'};
  //       const actualBody = res.body;
  //
  //       t.error(err, 'No error');
  //       t.deepEqual(actualBody, expectedBody, 'Retrieve body');
  //       t.end();
  //     });
  // });
};
