const assert = require('assert');
const User = require('../src/user');

describe('Creating recrods', () => {
  it('saves a user', (done) => {
    // assert(1 + 1 === 2);
    const joe = new User({ name: 'Joe' });

    joe.save().then(() => {
      //   Has joe been saved successfully?
      assert(joe.isNew === false);
      done();
    });
  });
});
