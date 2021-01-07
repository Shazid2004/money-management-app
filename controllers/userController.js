const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const User = require('../models/User');

module.exports = {
  login(req, res, next) {
    let { email, password } = req.body;
    const validate = loginValidator({ email, password });
    if (!validate.isValid) {
      return res.status(422).json(validate.error);
    } else {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return res.status(422).json({ message: 'E-Mail does not exists' });
          } else {
            bcrypt
              .compare(password, user.password)
              .then((isMatched) => {
                if (!isMatched) {
                  return res.status(422).json({ message: 'Password did not matched' });
                } else {
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }, 'SECRET', { expiresIn: '1h' })

                    return res.status(200).json({
                        message: 'Login successful',
                        token: `Bearer ${token}`
                    })
                }
              })
              .catch((error) => {
                console.log(error);
                return res
                  .status(500)
                  .json({ message: 'Server error occured' });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: 'Server error occured' });
        });
    }
  },
  register(req, res, next) {
    let { name, email, password, confirmPassword } = req.body;
    const validate = registerValidator({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!validate.isValid) {
      return res.status(422).json(validate.error);
    } else {
      User.findOne({ email })
        .then((user) => {
          if (user) {
            return res.status(422).json({ message: 'E-Mail already exists' });
          } else {
            return bcrypt
              .hash(password, 12)
              .then((hashedPass) => {
                const user = new User({
                  name,
                  email,
                  confirmPassword,
                  password: hashedPass,
                });
                return user.save();
              })
              .then((user) => {
                return res.status(201).json({
                  message: 'User created successfully',
                  user,
                });
              })
              .catch((error) => {
                console.log(error);
                return res
                  .status(500)
                  .json({ message: 'Server error occured' });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: 'Server error occured' });
        });
    }
  },
};
