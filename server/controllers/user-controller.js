const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

module.exports = {

  registerUser: function (req, res) {
    const salt = bcryptjs.genSaltSync(8);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })
      .then(user => {
        const userToken = jwt.sign(
          {
            id: user._id,
            username: user.username,
            email: user.email
          },
          process.env.JWT_SECRET_KEY
        );

        let data = {
          token: userToken,
          userId: user._id,
          username: user.username,
          email: user.email
        };
        res.status(200).json({
          message: "user successfully registered",
          data
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  },

  loginUser: function (req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        const checkPassword = bcryptjs.compareSync(
          req.body.password,
          user.password
        );

        if (checkPassword) {
          const userToken = jwt.sign(
            {
              id: user._id,
              username: user.username,
              email: user.email
            },
            process.env.JWT_SECRET_KEY
          );

          let data = {
            token: userToken,
            userId: user._id,
            username: user.username,
            email: user.email
          };
          res.status(200).json({
            message: "sign in success",
            data
          });
        } else {
          res.status(400).json({
            message: "password wrong"
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          message: "email wrong",
          err
        });
      });
  },

  findUser: function (req, res) {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    User.findOne({_id: decode.id})
      .then(data => {
        res.status(200).json({
          message: "data users",
          data
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

}
  
