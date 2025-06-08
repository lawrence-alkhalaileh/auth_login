import UserModel from "../../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function login(req, res) {
  const { username, password } = req.body;

  if (!password) {
    return res.status(400).send({ error: "password is required" });
  }

  try {
    const findUser = await UserModel.findOne({ username });

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (comparePassword) {
      const token = jwt.sign(
        {
          userId: findUser._id,
          username: findUser.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      return res
        .status(200)
        .send({ msg: "Login successful", username: findUser.username, token });
    } else {
      return res.status(400).send({ error: "Incorrect password" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}
