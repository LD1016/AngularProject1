const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/muber_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once('open', () => {
      console.log('Connecting to muber_test');
      done();
    })
    .on('error', (err) => {
      console.log('Warning', err);
    });
});

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
  // add done at catch because at the beginning we don't have any database
});
