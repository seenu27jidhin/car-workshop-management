import express from 'express';
import db from './db/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config('./.env');
import routes from './routes/index.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the Express Server!');
});

app.use('/api', routes);
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
