import Folder from "../model/folderModel.js";
import User from "../model/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createToken } from "../utils/createToken.js";
import { hashPassword, matchPassword } from "../utils/hashPassword.js";

export const userLogin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).populate({
    path: "root_folder",
    populate: { path: "sub_folder" },
  });

  const isPasswordCorrect = matchPassword(password, user.password);
  if (!isPasswordCorrect) {
    return next(new apiError(400, "incorrect password"));
  }

  const token = createToken(user._id);

  return res.json(new apiResponse(200, { token, user }));
});

export const userSignup = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const existUser = await User.findOne({ username });

  if (existUser) {
    return next(new apiError(400, "username already taken"));
  }

  const hashedPassword = hashPassword(password);
  let newUser = new User({ username, password: hashedPassword });

  const rootFolder = new Folder({ type: "root", name: username });
  await rootFolder.save();

  newUser.root_folder = rootFolder._id;

  await newUser.save();

  const token = createToken(newUser._id);

  const user = await User.findById(newUser._id).populate({
    path: "root_folder",
    populate: { path: "sub_folder" },
  });

  return res.json(new apiResponse(200, { user, token }));
});

export const userAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "root_folder",
    populate: { path: "sub_folder" },
  });
  if (!user) {
    return next(new apiError(400, "user not found"));
  }
  return res.json(new apiResponse(200, user));
});
