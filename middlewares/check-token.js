import jwt from 'jsonwebtoken';
import User from '../db/models/user-schema.js';
const checkToken = roles => {
  return async (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      console.log(bearerToken);
      if (!bearerToken) {
        return res.status(403).json({ message: 'you are not a user' });
      }
      const token = bearerToken.split(' ')[1];
      const key = 'hdhsbjfjdxcbudiweowosszxmznbcjxbjvbxj7637bjfbdj234';
      const isValid = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);

      console.log('token', token);
      //req.userid = await User.findById(isValid.user_id);

      if (!roles.includes(isValid.role)) {
        return res.status(403).json({ message: 'Role Not Match' });
      }
      req.userId = isValid.user_id;
      req.userRole = isValid.role;
      req.userName = isValid.user_name;
      //console.log(token);
      next();
    } catch (e) {
      return res.status(403).json({ message: 'You are not are' });
    }
  };
};
export default checkToken;
