import { User } from '../models/User.js';

const signup = async (req, res) => {
  try {
    if (
      (!req.body.username,
      !req.body.email,
      !req.body.password,
      !req.body.firstName,
      !req.body.lastName)
    ) {
      return res.status(400).send({
        success: false,
        message: 'Send all required fields: username, email, password, firstName, lastName',
      });
    }

    // New user data
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'user',
    };

    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'Email already exists',
      });
    }

    // const addedData = await User.create(newUser);
    return res.status(201).send({
      success: true,
      //   data: addedData,
      message: 'Successfully created',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export { signup };
