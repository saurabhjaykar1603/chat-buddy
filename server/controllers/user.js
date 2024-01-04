import User from "../model/User.js";
import md5 from "md5";

const postApiV1Signup = async (req, res) => {
  const { userName, email, password } = req.body;
  const nameAlreadyExists = await User.findOne({ userName });
  if (nameAlreadyExists) {
    return res.status(400).json({
      success: false,
      message: "Name already exists",
    });
  }
  const emailAlreadyExits = await User.findOne({ email });
  if (emailAlreadyExits) {
    return res.status(400).json({
      success: false,
      message: "Email already Exits",
    });
  }
  try {
    const user = new User({
      userName,
      email,
      password: md5(password),
    });

    const newUser = await user.save();
    res.status(201).json({
      success: true,
      data: newUser,
      message: "signup successfull",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export { postApiV1Signup };
