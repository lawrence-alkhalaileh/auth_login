import UserModel from "../model/User.model.js";

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    if (!username) {
      return res.status(400).send({ error: "Username is required" });
    }

    let exist = await UserModel.findOne({ username });
    if (!exist) {
      return res.status(404).send({ error: "User not found" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Authentication Error" });
  }
}
