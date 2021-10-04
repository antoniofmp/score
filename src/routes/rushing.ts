import { Router } from 'express';
import { rushingController } from '../controllers/RushingController';

class RushingRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    //Rushing routes
    config(): void {
        this.router.get('/', rushingController.index);
        this.router.get('/addRushing', rushingController.renderFormRushing);
        this.router.post('/addRushing', rushingController.saveRushing);
        this.router.get('/filterRushing', rushingController.renderFilterRushing);
        this.router.post('/filterRushing', rushingController.postRushing);
        this.router.get('/sortRushingByTotalYards', rushingController.sortRushingByTotalYards);
        this.router.get('/sortRushingByLongestRush', rushingController.sortRushingByLongestRush);
        this.router.get('/sortRushingByTouchdowns', rushingController.sortRushingByTouchdowns);
        this.router.get('/addRushingDB', rushingController.addRushingDB);
        this.router.get('/rushingExportCsv', rushingController.rushingExportCsv);
    }

}

const rushingRoutes = new RushingRoutes();
export default rushingRoutes.router;