import prisma from "../../../database/connection";
import { ILoginService } from "../interfaces/ILoginService";

export class LoginService {
  async execute(props: ILoginService) {
    const user = await prisma.user.findUnique({
      where: { 
        email: props.email
      }
    })

    if (!user) {
      throw new Error('Email ou senha inválidos')
    }

    if (user.password !== props.password) {
      throw new Error('Email ou senha inválidos')
    }

    return user
  }
}