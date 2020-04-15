import dotenv from 'dotenv';
import express, { Application, Response } from 'express';
import path from 'path';

dotenv.config();

const app: Application = express();
const port = process.env.SERVER_PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (_, res: Response) => {
  res.render('index', {
    title: 'Sunrise-Sunset'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
