const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({ name: 'Joe', post: [{ title: 'Post Title!!!' }] });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.post[0].title === 'Post Title!!!');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    const joe = User({ name: 'Joe', post: [] });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.post.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.post[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument of an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      post: [{ title: 'New Post' }, { title: 'another post' }],
    });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const post = user.post[0];
        // mongoose method NOT javascript method
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.post.length === 1);
        done();
      });
  });
});
