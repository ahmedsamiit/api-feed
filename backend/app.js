const path = require('path');

const config = require('./config/config');
const connectDB = require('./data-source/mongo');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const corsOrigin = require('./middleware/corsOrigin');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const multer = require('multer');


const app = express();

app.use(helmet());

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(corsOrigin);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.statusCode || 500).json({
        message: error.message || 'Internal server error.'
    });
});

const startServer = async () => {
    try {
        // Connect MongoDB (mongoose)
        await connectDB();


        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();