import { Request, Response } from "express";
import { CreateSimulationService } from "../services/CreateSimulationService";

export class CreateSimulationController {
  async handle(req: Request, res: Response) {
    const { 
      title,
      description,
      debtAmount,
      userId
    } = req.body;

    const createSimulationService = new CreateSimulationService();

    const simulation = await createSimulationService.execute({
      title,
      description,
      debtAmount,
      userId
    })

    return res.status(200).json(simulation)
  }
}