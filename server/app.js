import express from 'express'
import cors from 'cors'
import path from 'path';
import multer from 'multer';
import fs from 'fs'
import Blob from 'cross-blob'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const upload = multer({
  dest: 'public/uploads/',
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.post('/upl', upload.any(), (req, res, next) => {
  try {
    const file = req.files;
    res.json(file[0].filename);
  } catch(err) {
    res.json(err.message)
  }
});

app.post('/read', (req, res, next) => {
  const { id } = req.body;
  const data = fs.readFileSync(`./public/uploads/${id}`);

  res.contentType('application/pdf').send(data);
});

export { app }
