import express from 'express';
import albumsRoutes from './routes/albums.routes';
import genreRoutes from './routes/genre.routes';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());
// routes
app.use('/api/albums', albumsRoutes);
app.use('/api/genre', genreRoutes);

const port = 4000;

app.listen(port, () => {
    console.log(`Server is running ${port}`)
})