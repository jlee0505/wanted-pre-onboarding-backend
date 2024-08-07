import jobRoutes from './routes/jobRoutes';
import { sequelize } from './models';
import { errorHandler } from './middleware/errorHandler';
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
app.use('/jobs', jobRoutes);
app.use((req: Request, res: Response, next: any) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
