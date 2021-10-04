import { Request, Response } from 'express';

class IndexController {

    public index (req: Request, res: Response) {
        res.render('index', { title: 'The rush'});        
    }

}

export const indexController = new IndexController();