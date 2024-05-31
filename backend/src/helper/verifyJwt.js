import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};
