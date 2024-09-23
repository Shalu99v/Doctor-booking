const jwt = require('jsonwebtoken');
const checkToken = roleArr => {
  return (req, res, next) => {
    try {
      const bToken = req.headers.authorization;

      if (!bToken) {
        return res.status(403).json({ message: 'You are not authorized' });
      }

      const token = bToken.split(' ')[1];
      console.log(token,"tokensss");

      const isValid = jwt.verify(token, process.env.SECRET_KEY);
      if (!roleArr.includes(isValid.role)) {
        return res.status(403).json({ message: 'You are not authorized' });
      }
      next();
    } catch (e) {
      return res.status(403).json({ message: 'You are not authorized' });
    }
  };
};

module.exports = checkToken;
