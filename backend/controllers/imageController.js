import Folder from "../model/folderModel.js";
import Image from "../model/imageModel.js";
import { apiResponse } from "../utils/apiResponse.js";

export const addImage = async (req, res) => {
  const newImage = new Image({ name: req.body.name, path: req.body.path });
  const folder = await Folder.findById(req.body.folder);
  folder.images.push(newImage._id);
  await newImage.save();
  await folder.save();
  return res.json(new apiResponse(200, folder));
};
