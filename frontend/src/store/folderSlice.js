import { createSlice } from "@reduxjs/toolkit";

const folderSlice = createSlice({
  name: "folder",
  initialState: {
    presentFolder: null,
  },
  reducers: {
    setPresentFolder: (state, action) => {
      state.presentFolder = action.payload;
    },
    addFolder: (state, action) => {
      state.presentFolder.folders = [
        ...state.presentFolder.folders,
        action.payload,
      ];
    },
    addImage: (state, action) => {
      state.presentFolder.images = [
        ...state.presentFolder.images,
        action.payload,
      ];
    },
    deleteImage: (state, action) => {
      const newImages = state.presentFolder.images.filter((m) => {
        if (m._id.toString() !== action.payload.id) {
          return true;
        }
      });
      state.presentFolder.images = newImages;
    },
    deleteFolder: (state, action) => {
      const newFolders = state.presentFolder.folders.filter((m) => {
        if (m._id.toString() !== action.payload.id) {
          return true;
        }
      });
      state.presentFolder.folders = newFolders;
    },
  },
});

export const {
  setPresentFolder,
  addFolder,
  addImage,
  deleteFolder,
  deleteImage,
} = folderSlice.actions;

export default folderSlice.reducer;
