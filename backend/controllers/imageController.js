import Folder from "../model/folderModel.js";
import Image from "../model/imageModel.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addImage = asyncHandler(async (req, res) => {
  const newImage = new Image(req.body);
  const folder = await Folder.findById(req.body.parent_folder);
  folder.images.push(newImage._id);
  await newImage.save();
  await folder.save();
  return res.json(new apiResponse(200, newImage));
});

export const deleteImage = asyncHandler(async (req, res, next) => {
  const folder = await Folder.findById(req.body.folder);
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
