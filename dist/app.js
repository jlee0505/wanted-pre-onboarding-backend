"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const models_1 = require("./models");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/jobs', jobRoutes_1.default); // Ensure routes are prefixed with /jobs
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const PORT = process.env.PORT || 3000;
models_1.sequelize.sync().then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
