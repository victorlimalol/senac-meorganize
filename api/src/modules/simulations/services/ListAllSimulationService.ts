import prisma from "../../../database/connection";

export class ListAllSimulationService {
  async execute(userId: number) {
    const userExists = await prisma.user.findUnique({
      where: {
        Id: userId
      }
    })

    if (!userExists) {
      throw new Error("Usuário não existe")
    }

    const simulations = await prisma.simulation.findMany({
      where: {
        Id: userId
      }
    })

    return simulations
  }
}