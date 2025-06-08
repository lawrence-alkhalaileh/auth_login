import UserModel from "../../model/User.model.js";
import bcrypt from "bcrypt";

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(404).send({ error: "Session expired!" });
    }
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updateResult = await UserModel.updateOne(
      { username },
      { password: hashedPassword }
    );

    if (updateResult.modifiedCount > 0) {
      return res.status(201).send({ msg: "Password Updated Successfully!" });
    } else {
      return res.status(400).send({ error: "Password update failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
