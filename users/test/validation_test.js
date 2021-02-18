const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    // console.log(validationResult); // To see what inside validationResult
    const message = validationResult.errors.name.message;
    // console.log(message); // Name is Required
    assert(message === 'Name is required.');
  });

  it('require a user name longer than 2 characters', () => {
    const user = new User({ name: 'Ai' });
    const validationResult = user.validateSync();
    // console.log(validationResult);
    const message = validationResult.errors.name.message;
    assert(message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Ai' });
    user.save().catch((validationResult) => {
      const message = validationResult.errors.name.message;
      assert(message === 'Name must be longer than 2 characters.');
      done();
    });
  });
});
