import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyToken) {
      req.user = verifyToken;
      next();
    } else {
      return res.status(403).send({ error: "Request Not allowed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Authentication Failed!" });
  }
}
