const assert = require('assert');
const User = require('../src/user');

describe('Delete a user', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });
  it('model instance remove', (done) => {
    joe
      .remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it('class method remove', (done) => {
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it('class method findOneAndRemove', (done) => {
    // Find the first one with the criteria and remove
    // User.findOneAndRemove({ name: 'Joe' })
    User.deleteOne({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  //   it('class method findByIdAndRemove', (done) => {
  //     User.findByIdAndRemove(joe._id)
  //       .then(() => User.findOne({ name: 'Joe' }))
  //       .then((user) => {
  //         assert(user === null);
  //         done();
  //       });
  //   });
});
