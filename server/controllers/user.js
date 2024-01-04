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

const postApiV1Login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    res.status(400).json({
      success: false,
      message: "please provide email password",
    });
  }
  try {
    const user = await User.findOne({ email, password: md5(password) });
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
        message: "login successfull",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid Credintial",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export { postApiV1Signup, postApiV1Login };
