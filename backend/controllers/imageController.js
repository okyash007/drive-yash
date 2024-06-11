import Folder from "../model/folderModel.js";
import Image from "../model/imageModel.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addImage = asyncHandler(async (req, res, next) => {
  const newImage = new Image({ ...req.body, user: req.user.id });
  const folder = await Folder.findById(req.body.parent_folder);

  if (!folder) {
    return next(new apiError(400, "there is no such folder"));
  }

  if (folder.user.toString() !== req.user.id) {
    return next(new apiError(400, "you can only access your folder"));
  }

  folder.images.push(newImage._id);
  await newImage.save();
  await folder.save();
  return res.json(new apiResponse(200, newImage));
});

export const deleteImage = asyncHandler(async (req, res, next) => {
  const folder = await Folder.findById(req.body.folder);

  if (!folder) {
    return next(new apiError(400, "there is no such folder"));
  }

  if (folder.user.toString() !== req.user.id) {
    return next(new apiError(400, "you can only access your folder"));
  }

  const newImages = folder.images.filter((m) => {
    if (m._id.toString() !== req.params.id) {
      return true;
    }
  });
  folder.images = newImages;
  await folder.save();

  await Image.findByIdAndDelete(req.params.id);

  return res.json(new apiResponse(200));
});

export const searchImage = asyncHandler(async (req, res, next) => {
  const nameRegex = new RegExp(req.params.text, "i");

  const images = await Image.find({
    name: nameRegex,
    user: req.user.id,
  });

  return res.json(new apiResponse(200, images));
});
