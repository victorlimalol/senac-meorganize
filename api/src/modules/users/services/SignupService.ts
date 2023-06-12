import prisma from "../../../database/connection";
import { ISignupService } from "../interfaces/ISignupService";

export class SignupService {
  async execute(props: ISignupService) {
    const emailExists = await prisma.user.findUnique({
      where: { 
        email: props.email
      }
    })

    if (emailExists) {
      throw new Error('Email já está sendo usado')
    }

    const monthlyIncome = props.monthlyIncome * 100

    const user = await prisma.user.create({
      data: {
        email: props.email,
        firstname: props.firstname,
        lastname: props.lastname,
        monthlyIncome: monthlyIncome,
        peopleAtHome: Number(props.peopleAtHome),
        password: props.password,
      }
    })

    if (!user) {
      throw new Error('Algo deu errado')
    }

    return user
  }
}