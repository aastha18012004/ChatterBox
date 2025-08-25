import grid from "gridfs-stream";
import mongoose from "mongoose";

const BASE_URL = "http://localhost:8000";

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(404).json({ error: "File not found" });
  }

  const imageUrl = `${BASE_URL}/file/${req.file.filename}`;

  return res.status(200).json({
    url: imageUrl,   // ✅ only this is needed for frontend
  });
};

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
