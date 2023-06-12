import { Request, Response, Router, request, response } from "express"
import { SignupService } from "../modules/users/services/SignupService";
import { SignupController } from "../modules/users/controllers/SignupController";
import { LoginController } from "../modules/users/controllers/LoginController";
import { ListAllSimulationController } from "../modules/simulations/controllers/ListAllSimulationController";
import { CreateSimulationController } from "../modules/simulations/controllers/CreateSimulationController";

const router = Router();

router.post('/signup', new SignupController().handle)
router.post('/login', new LoginController().handle)

router.post('/create/financialSimulation', new CreateSimulationController().handle)
router.get('/list/financialSimulations', new ListAllSimulationController().handle)

router.get('/', (req: Request, res: Response) => {
  return res.json({ message: "Ok" })
})

export default router