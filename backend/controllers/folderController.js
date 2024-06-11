import Folder from "../model/folderModel.js";
import Image from "../model/imageModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createFoler = asyncHandler(async (req, res, next) => {
  const newFolder = new Folder({ ...req.body, user: req.user.id });

  const parentFolder = await Folder.findById(req.body.parent_folder);

  if (parentFolder.user.toString() !== req.user.id) {
    return next(new apiError(400, "you can only access your parent folders"));
  }

  parentFolder.sub_folder.push(newFolder._id);

  await newFolder.save();
  await parentFolder.save();
  return res.json(new apiResponse(200, newFolder));
});

export const getFolder = asyncHandler(async (req, res, next) => {
  const folder = await Folder.findById(req.params.id)
    .populate("images")
    .populate("sub_folder");

  if (!folder) {
    return next(new apiError(400, "there is no such folder"));
  }

  if (folder.user.toString() !== req.user.id) {
    return next(new apiError(400, "you can only access your folder"));
  }

  return res.json(new apiResponse(200, folder));
});

export const deleteFolder = asyncHandler(async (req, res, next) => {
  const parentFolder = await Folder.findById(req.body.parent_folder);

  if (parentFolder.user.toString() !== req.user.id) {
    return next(new apiError(400, "you can only access your parent folders"));
  }

  const newSubfolder = parentFolder.sub_folder.filter((m) => {
    if (m._id.toString() !== req.params.id) {
      return true;
    }
  });
  parentFolder.sub_folder = newSubfolder;

  await parentFolder.save();

  const folder = await Folder.findById(req.params.id);

  if (!folder) {
    return next(new apiError(400, "there is no such folder"));
  }

  if (folder.user.toString() !== req.user.id) {
    return next(new apiError(400, "you can only access your folder"));
  }

  await Image.deleteMany({ _id: { $in: folder.images } });
  await Folder.deleteMany({
    _id: { $in: [...folder.sub_folder, req.params.id] },
  });

  return res.json(new apiResponse(200));
});
