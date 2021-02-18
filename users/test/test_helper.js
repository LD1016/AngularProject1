const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

before((done) => {
  // mongoose.connect('mongodb://65.6.6.7:4000/users_test');
  mongoose.connect('mongodb://localhost/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once('open', () => {
      done();
      console.log('Good to go!');
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

// Before hook need to run at the beginning to clear out all the data to test
beforeEach((done) => {
  // mongoose.connection.collections.users.drop(() => {
  //   // Ready to run the next test!
  //   done();
  // });
  const { users, blogposts, comments } = mongoose.connection.collections;

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
