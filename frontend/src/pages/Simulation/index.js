import { Link } from "react-router-dom";
import { PrivateHeader } from "../../components/PrivateHeader";
import './styles.css'

export function Simulation() {
  return (
    <div className="container">
      <PrivateHeader />
      <div className="content-simulation">
        <h1 className="title-simulation">Criar uma simulação agora:</h1>
        <Link to="/form" className="btn-entrar" style={{ width: "300px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>Simular</Link>
      </div>
    </div>
  )
}