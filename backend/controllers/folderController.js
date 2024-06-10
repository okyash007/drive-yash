import Folder from "../model/folderModel.js";
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
