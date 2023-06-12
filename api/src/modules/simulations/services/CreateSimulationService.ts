import prisma from "../../../database/connection";
import { ICreateSimulationService } from "../interfaces/ICreateSimulationService";

export class CreateSimulationService {
  async execute(props: ICreateSimulationService) {
    const userExists = await prisma.user.findUnique({
      where: {
        Id: props.userId
      }
    })

    if (!userExists) {
      throw new Error("Usuário não existe")
    }

    const monthlyIncome = userExists.monthlyIncome / 100;
    const monthlySurplus = this.calculateMonthlySurplus(monthlyIncome, userExists.peopleAtHome);
    const projectedValue = this.calculateDebtInstallment(props.debtAmount, monthlySurplus)
    const projectedInstallment = this.calculatePaymentInstallment(props.debtAmount, monthlySurplus);

    const simulation = await prisma.simulation.create({
      data: {
        title: props.title,
        description: props.description,
        debtAmount: props.debtAmount * 100,
        projectedValue: projectedValue * 100,
        projectedInstallment: projectedInstallment * 100,
        userId: props.userId
      }
    })

    return simulation
  }

  calculateMonthlySurplus(monthlyIncome: number, peopleAtHome: number) {
    let surplus = 0;

    console.log(monthlyIncome)

    if(monthlyIncome < 1200){
      surplus = monthlyIncome - (peopleAtHome * 197)
    }else if(monthlyIncome > 1200 && monthlyIncome < 3600 ){
      surplus = monthlyIncome - (peopleAtHome * 205)
    }else if(monthlyIncome > 3600 && monthlyIncome < 6000){
      surplus = monthlyIncome - (peopleAtHome * 316)
    }else if(monthlyIncome > 6000 && monthlyIncome < 18000){
      surplus = monthlyIncome - (peopleAtHome * 505)
    }else if(monthlyIncome > 18000){
      surplus = monthlyIncome - (peopleAtHome * 515)
    }

    return surplus;
  }

  calculatePaymentInstallment(debtAmount: number, monthlySurplus: number) {
    let installment = 0;

    if(monthlySurplus > 100){
        if(debtAmount >= 1000){
          installment = 10;
        }else if(debtAmount < 1000 && debtAmount >= 750){
          installment = 7; 
        }else if (debtAmount < 750 && debtAmount >= 500){
          installment = 5;
        }else if (debtAmount < 500 && debtAmount >= 250){
          installment = 3;
        }else if (debtAmount < 250 && debtAmount >= 100){
          installment = 2;
        }
    }else{
        if(debtAmount >= 1000){
            installment = 20;
        }else if(debtAmount < 1000 && debtAmount >= 750){
            installment = 14; 
        }else if (debtAmount < 750 && debtAmount >= 500){
            installment = 10;
        }else if (debtAmount < 500 && debtAmount >= 250){
            installment = 6;
        }else if(debtAmount < 250 && debtAmount >= 100){
            installment = 4;
        }
    }
    return installment;
  }

  calculateDebtInstallment(debtAmount: number, monthlySurplus: number) {
    let installment = 0;

    console.log(`${debtAmount} >>>>>> ${monthlySurplus}`)
      
    if(monthlySurplus > 100){
      if(debtAmount >= 1000){
          installment = 10;
      }else if(debtAmount < 1000 && debtAmount >= 750){
          installment = 7; 
      }else if (debtAmount < 750 && debtAmount >= 500){
          installment = 5;
      }else if (debtAmount < 500 && debtAmount >= 250){
          installment = 3;
      }else if (debtAmount < 250 && debtAmount >= 100){
          installment = 2;
      }
    } else {
      if(debtAmount >= 1000){
        debtAmount = 20;
      }else if(debtAmount < 1000 && debtAmount >= 750){
        debtAmount = 14; 
      }else if (debtAmount < 750 && debtAmount >= 500){
        debtAmount = 10;
      }else if (debtAmount < 500 && debtAmount >= 250){
        debtAmount = 6;
      }else if(debtAmount < 250 && debtAmount >= 100){
        debtAmount = 4;
      }
    }

    const payment = debtAmount/installment;
    return payment;
  } 
}