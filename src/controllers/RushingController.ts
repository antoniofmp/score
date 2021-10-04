import { Request, Response } from 'express';
import RushingModel, { Rushing } from '../models/Rushing';
const objectstocsv = require('objects-to-csv')
let rushingData = require("../import/rushing.json");

class RushingController {

    /*
        action: index
        description: Renders the index land page
    */
    public async index(req: Request, res: Response) {
        const rushing: Rushing[] = await RushingModel.find({});
        res.render('rushing/index', { 
            title: 'Rushing',
            rushing
        });
    }

    /*
        action: renderFormRushing
        description: Renders the add rushing form.
    */
    public renderFormRushing(req: Request, res: Response) {
        res.render('rushing/addRushing', {
            title: 'Add a Rushing'
        });
    }

    /*
        action: saveRushing
        description: Saves into mongodb a rushing entry.
    */
    public async saveRushing(req: Request, res: Response) {
        const { player, team, pos, attg, att, yds, avg, ydsg, td, lng, first, firstpercentage, twenty, forty, fum } = req.body;
        const newRushing: Rushing = new RushingModel({
            player,
            team,
            pos,
            attg,
            att,
            yds,
            avg,
            ydsg,
            td,
            lng,
            first,
            firstpercentage,
            twenty,
            forty,
            fum
        });
        await newRushing.save();
        res.redirect('/rushing');
    }

    /*
        action: renderFilterRushing
        description: Renders the filter rushing form.
    */
    public async renderFilterRushing(req: Request, res: Response) {
        res.render('rushing/filterRushing', {
            title: 'Filter rushing'
        });
    }

    /*
        action: postRushing
        description: Filter post request.
    */
    public async postRushing(req: Request, res: Response) {
        const { player } = req.body;
        const rushing: Rushing[] = await RushingModel.find().or([
            { $or: [{player}] } //Add to this array whichever you want to filter by. In this case only by player name, but could be by more
        ]);
        res.render('rushing/rushingView', { 
            rushing
        });
    }

    /*
        action: rushingExportCsv
        description: Exports csv file.
    */
    public async rushingExportCsv() {
        const csv = new objectstocsv(rushingData);
        await csv.toDisk('./csv/rushing.csv');
    }

    /*
        action: sortRushingByTotalYards
        description: Sorts rushing by total yards.
    */
    public async sortRushingByTotalYards(req: Request, res: Response) {
        const rushing: Rushing[] = await RushingModel.find().sort({ yds: -1 });
        res.render('rushing/rushingView', { 
            rushing
        });
    }

    /*
        action: sortRushingByLongestRush
        description: Sorts rushing by total yards.
    */
    public async sortRushingByLongestRush(req: Request, res: Response) {
        const rushing: Rushing[] = await RushingModel.find().sort({ lng: -1 });
        res.render('rushing/rushingView', { 
            rushing
        });
    }

    /*
        action: sortRushingByTouchdowns
        description: Sorts rushing by total rushing touchdowns.
    */
    public async sortRushingByTouchdowns(req: Request, res: Response) {
        const rushing: Rushing[] = await RushingModel.find().sort({ td: -1 });
        res.render('rushing/rushingView', { 
            rushing
        });
    }

    /*
        action: addRushingDB
        description: Saves into mongodb list of rushing coming from a JSON of rushing data.
    */
    public async addRushingDB(req: Request, res: Response) {
        await Promise.all(
            rushingData.map(async (rushing) => {
                const { Player: player, Team: team, Pos: pos, AttG: attg, Att: att, Yds: yds, Avg: avg, YdsG: ydsg, TD: td, Lng: lng, first, firstpercentage, twenty, forty, FUM: fum } = rushing;
                const newRushing: Rushing = new RushingModel({
                    player,
                    team,
                    pos,
                    attg,
                    att,
                    yds,
                    avg,
                    ydsg,
                    td,
                    lng,
                    first,
                    firstpercentage,
                    twenty,
                    forty,
                    fum
                });
                await newRushing.save();
            })
        );

        res.redirect('/rushing');
    }
}

export const rushingController = new RushingController();