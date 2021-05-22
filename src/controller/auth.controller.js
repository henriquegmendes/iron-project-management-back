const Users = require('../models/Users');
const passwordManager = require('../utils/password.utils');
const jwtManager = require('../utils/jwt.utils');

class AuthController {
  constructor() {
    this.Users = Users;
    this.passwordManager = passwordManager;
  }

  signup = async (req, res, next) => {
    try {
      const userFromDb = await this.Users.findOne({ email: req.body.email });

      if (userFromDb) {
        return res.status(400).json({ message: 'Email has already been used' });
      }

      const encryptedPassword = this.passwordManager.encrypt(req.body.password);

      const newUser = new this.Users({ ...req.body, password: encryptedPassword });

      await newUser.save();

      res.status(201).json({ message: `User with id ${newUser._id} created succesfully` });
    } catch (error) {
      console.log(error);
    }
  }
  
  login = async (req, res, next) => {
    try {
      const userFromDb = await this.Users.findOne({ email: req.body.email });

      if (!userFromDb) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = passwordManager.verify(req.body.password, userFromDb.password);
      
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwtManager.generateAuthToken(userFromDb);

      res.status(200).json({ message: token }); // retornar um TOKEN!!!!!!!
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new AuthController();
