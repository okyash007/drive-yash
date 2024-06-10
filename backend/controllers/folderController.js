import Folder from "../model/folderModel.js";
import Image from "../model/imageModel.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createFoler = asyncHandler(async (req, res) => {
  const newFolder = new Folder(req.body);

  const parentFolder = await Folder.findById(req.body.parent_folder);
  parentFolder.sub_folder.push(newFolder._id);

  await newFolder.save();
  await parentFolder.save();
  return res.json(new apiResponse(200, newFolder));
});

export const getFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.findById(req.params.id)
    .populate("images")
    .populate("sub_folder");
  return res.json(new apiResponse(200, folder));
});

export const deleteFolder = asyncHandler(async (req, res, next) => {
  const parentFolder = await Folder.findById(req.body.parent_folder);
  const newSubfolder = parentFolder.sub_folder.filter((m) => {
    if (m._id.toString() !== req.params.id) {
      return true;
    }
  });
  parentFolder.sub_folder = newSubfolder;

  await parentFolder.save();

  const folder = await Folder.findById(req.params.id);
  await Image.deleteMany({ _id: { $in: folder.images } });
  await Folder.deleteMany({
    _id: { $in: [...folder.sub_folder, req.params.id] },
  });

  return res.json(new apiResponse(200));
});
