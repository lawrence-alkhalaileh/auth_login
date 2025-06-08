import UserModel from "../../model/User.model.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    if (!username || !password || !email) {
      return res.status(403).send("fields are required");
    }

    const existUsername = await UserModel.findOne({ username });
    if (existUsername) {
      return res.status(403).send("user already exist");
    }

    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(403).send("this email already used");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      email,
      password: hashedPassword,
      profile: profile || "",
      username,
    });

    return res.status(201).send({ msg: "user created" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}
