const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
// Another way to get Driver model in beside using require
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', (done) => {
    // request(app)
    //   .post('/api/drivers')
    //   .send({ email: 'test@test.com' })
    //   .end(() => {
    //     done();
    //   });

    Driver.countDocuments().then((count) => {
      //   console.log('Hello ', count);
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          //   console.log('Hello from here');
          Driver.countDocuments().then((newCount) => {
            // console.log(count);
            // console.log(newCount);
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers/:id edits an existing driver', (done) => {
    const driver = new Driver({ email: 't@t.com', driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ _id: driver._id }).then((updatedDriver) => {
            // console.log(updatedDriver);
            assert(updatedDriver.driving === true);
            done();
          });
          // .catch((err) => done(err));
        });
    });
  });

  it('DELETE to /api/drivers/:id delete an existing driver', (done) => {
    const driver = new Driver({ email: 'test@test.com' });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ _id: driver._id }).then((deletedDriver) => {
            assert(deletedDriver === null);
            done();
          });
        });
    });
  });

  it('GET to /api/drivers finds drivers in a location', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] },
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] },
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          //   console.log(response);
          assert(response.body.length === 1);
          assert(response.body[0].email === 'miami@test.com');
          done();
        });
    });
  });
});
