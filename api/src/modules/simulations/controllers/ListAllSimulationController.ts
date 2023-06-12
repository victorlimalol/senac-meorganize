import { Request, Response } from "express";
import { ListAllSimulationService } from "../services/ListAllSimulationService";

export class ListAllSimulationController {
  async handle(req: Request, res: Response) {
    const { userId } = req.body;

    const listAllSimulationService = new ListAllSimulationService();

    const simulations = await listAllSimulationService.execute(userId)

    return res.status(200).json(simulations)
  }
}