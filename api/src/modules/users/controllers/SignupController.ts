import { Request, Response } from "express";
import { SignupService } from "../services/SignupService";

export class SignupController {
  async handle(req: Request, res: Response) {
    const { 
      firstname, 
      lastname,
      password,
      email,
      monthlyIncome,
      peopleAtHome 
    } = req.body;

    const signupService = new SignupService();

    const user = await signupService.execute({
      firstname,
      lastname,
      password,
      email,
      monthlyIncome,
      peopleAtHome
    })

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: user
    })
  }
}