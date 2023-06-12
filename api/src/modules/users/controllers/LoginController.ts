import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

export class LoginController {
  async handle(req: Request, res: Response) {
    const { 
      email,
      password
    } = req.body;

    const signupService = new LoginService();

    const user = await signupService.execute({
      email,
      password,
    })

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: user
    })
  }
}