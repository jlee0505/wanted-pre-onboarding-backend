const express = require('express');
const jobRoutes = require('./routes/jobRoutes');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(jobRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
