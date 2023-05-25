import { LineProduction } from "./LineProduction";

export class GeneralProductionInfo {
    productionId: number = 1;
    productName: string = 'Lungi';
    viewerInfo: string = 'asdasdasd';
    productionTarget: number = 70;
    productionReached: number = 135;
    assemblyLineList: any = [];
    lineProductions: LineProduction [] = [];

}