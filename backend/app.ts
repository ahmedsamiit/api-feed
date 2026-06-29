import path from 'path';

import express, { type ErrorRequestHandler, type RequestHandler } from 'express';


import bodyParser from 'body-parser';
import helmet from 'helmet';
import multer from 'multer';

const config = require('./config/config') as { port: number };
const connectDB = require('./data-source/mongo') as () => Promise<void>;
const corsOrigin = require('./middleware/corsOrigin') as RequestHandler;
import feedRoutes from './routes/feed';
import authRoutes from './routes/auth';

type AppError = Error & {statusCode?: number;};

const app = express();

app.use(helmet());

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(corsOrigin);

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'images');
  },
  filename: (_req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter }).single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

const errorHandler: ErrorRequestHandler = (error: AppError, _req, res, _next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error.'
  });
};

app.use(errorHandler);

const startServer = async () => {
  try {
    // Connect MongoDB (mongoose)
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to start server:', message);
    process.exit(1);
  }
};

startServer();
