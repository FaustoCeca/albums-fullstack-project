import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const router = Router();
const prismaClient = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
    const genres = await prismaClient.genre.findMany({
        include: {
            albums: true
        }
    });

    res.json(genres);
});

router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;

    const genre = await prismaClient.genre.create({
        data: {
            name,
        }
    });

    res.json(
        `Genre ${genre.name} created`
    );
});

export default router;