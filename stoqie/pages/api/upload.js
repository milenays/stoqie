import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), '/public/uploads/');

// Klasörün mevcut olduğundan emin olun
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
  }),
});

const handler = async (req, res) => {
  if (req.method === 'POST') {
    upload.array('file')(req, res, (err) => {
      if (err) {
        console.error('Upload Error:', err);
        return res.status(500).json({ error: `Failed to upload file(s): ${err.message}` });
      }
      res.status(200).json({ data: req.files.map(file => `/uploads/${file.filename}`) });
    });
  } else {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};