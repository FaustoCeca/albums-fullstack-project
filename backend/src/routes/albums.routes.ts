import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prismaClient = new PrismaClient();

router.get('/top-ten', async (req: Request, res: Response) => {
    const topTenAlbums = await prismaClient.album.findMany({
        orderBy: {
            listens: 'desc'
        },
        take: 10,
        include: {
            genre: true
        }
    });

    res.json(topTenAlbums);
});

router.get('/', async (req: Request, res: Response) => {
    const albums = await prismaClient.album.findMany({
        include: {
            genre: true
        }
    });

    res.json(albums);
});

router.post('/', async (req: Request, res: Response) => {
    const { name, genreId, author, listens } = req.body;

    if (!name || !genreId || !author || !listens) {
        return res.status(400).json('Missing parameters');
    }

    if (typeof name !== 'string' || typeof author !== 'string' || typeof listens !== 'number') {
        return res.status(400).json('Invalid parameters');
    }

    if (listens < 0) {
        return res.status(400).json('Listens cannot be minor than 0');
    }



    if (await prismaClient.album.findUnique({
        where: {
            name
        }
    })) {
        return res.status(400).json('Album already exists');
    }

    const genre = await prismaClient.genre.findUnique({
        where: {
            id: Number(genreId)
        }
    });

    if (!genre) {
        return res.status(400).json('Genre not found');
    }

    const album = await prismaClient.album.create({
        data: {
            name,
            author,
            listens,
            genre: {
                connect: {
                    id: Number(genreId)
                }
            }
        }
    });

    await prismaClient.genre.update({
        data: {
            albums: {
                connect: {
                    id: album.id
                }
            }
        },
        where: {
            id: Number(genreId)
        }
    });

    const albumWithGenre = await prismaClient.album.findUnique({
        where: {
            id: album.id
        },
        include: {
            genre: true
        }
    });

    res.status(201).json(albumWithGenre);
});

router.delete('/all', async (req: Request, res: Response) => {
    await prismaClient.album.deleteMany();

    res.json('All albums deleted');
})

export default router;