const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  index(req, res, next) {
    //   'http://google.com?lng=80&lat=20'
    // after ? is the query string
    const { lng, lat } = req.query;

    // console.log(parseFloat(lng));
    // 200000 is 200Km
    Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          maxDistance: 200000,
          distanceField: 'dis',
          spherical: true,
        },
      },
    ])
      .then((drivers) => {
        // console.log(drivers);
        res.send(drivers);
      })
      .catch(next);
  },

  //   create(req, res) {
  //     // console.log(req.body);
  //     // res.send({ hi: 'there' });
  //     const driverProps = req.body;

  //     Driver.create(driverProps).then((driver) => {
  //       res.send(driver);
  //     });
  //   },

  // Using next to call the next middleware
  // If something wrong we need to add .catch to call next
  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },

  edit(req, res, next) {
    const driverProps = req.body;
    const driverId = req.params.id;
    // console.log(driverId);

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findOneAndDelete({ _id: driverId })
      .then((driver) => {
        res.status(204).send(driver);
      })
      .catch(next);
  },
};
