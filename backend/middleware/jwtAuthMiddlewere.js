import jwt from "jsonwebtoken";

const jwtAuthMiddlewere = (req, res, next) => {
  const JWT_SECRET = "SECRET";
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  const token = authHeaders.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token found" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized: Invalid Token" });
    }
    console.log("verify token");
    req.user = user;
    next();
  });
};

export default jwtAuthMiddlewere;
