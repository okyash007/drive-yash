import Folder from "../model/folderModel.js";
import { apiResponse } from "../utils/apiResponse.js";

export const createFoler = async (req, res) => {
  const newFolder = new Folder(req.body);

  const parentFolder = await Folder.findById(req.body.parent_folder);
  parentFolder.sub_folder.push(newFolder._id);

  await newFolder.save();
  await parentFolder.save();
  return res.json(new apiResponse(200, newFolder));
};

export const getFolder = (req, res) => {};
