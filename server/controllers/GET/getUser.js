import UserModel from "../../model/User.model.js";

export async function getUser(req, res) {
  const { username } = req.params;
  // res.json({ route: "getUser route", username });
  try {
    if (!username) {
      return res.status(501).send({ error: "Invalid username" });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(500).send({ error: "Could not find user" });
    }
    const { password, ...rest } = Object.assign({}, user.toJSON());
    return res.status(201).send(rest);
  } catch (error) {
    return res.status(404).send({ error: "Cannot find user data" });
  }
}
