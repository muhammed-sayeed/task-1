import jsonwebtoken from "jsonwebtoken";

function roleBasedAuthentication(expectedRole) {
  return (req, res, next) => {
    try {
      const token =
        req.body.token || req.query.token || req.headers["authorization"];
      if (token) {
        jsonwebtoken.verify(
          token,
          process.env.access_secret,
          function (err, decoded) {
            if (err) {
              return res
                .status(401)
                .json({ error: true, message: "unauthorized access" });
            }
            res.locals.jwt_user = decoded;
            const role = res.locals.jwt_user.role;
            if (role == expectedRole) {
              next();
            } else {
              return res
                .status(401)
                .json({ error: true, message: "unauthorized access" });
            }
          }
        );
      } else {
        return res.status(401).json({
          msg: "No token Provided",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  };
}

export default roleBasedAuthentication;
