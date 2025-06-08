import UserModel from "../../model/User.model.js";

export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(400).send({ error: "User ID not provided" });
    }

    const body = req.body;

    const result = await UserModel.findByIdAndUpdate({ _id: userId }, body);

    if (result) {
      return res.status(200).send({ msg: "Record updated successfully" });
    } else {
      return res
        .status(404)
        .send({ error: "No matching record found or no change detected" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ error: "Server error", details: err.message });
  }
}
