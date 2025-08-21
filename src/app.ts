
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import sequelize from './config/database';
import documentRoutes from './routes/documentRoutes';


const app = express();

app.use(cors()); 
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



app.use ('/document', documentRoutes);

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); 
  }
}

startServer();


export default app;
