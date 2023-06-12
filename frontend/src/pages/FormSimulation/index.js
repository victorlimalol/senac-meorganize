import React, { useState } from "react";
import axios from "axios";
import './styles.css'
import { Header } from "../../components/Header";
import { PrivateHeader } from "../../components/PrivateHeader";
import { Link } from "react-router-dom";

export function FormSimulation() {
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ valueDebt, setValueDebt ] = useState(0);
  
  const [simulated, setSimulated] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [projectedValue, setProjectedValue] = useState(0)
  const [projectedInstallment, setProjectedInstallment] = useState(0)

  function handleSubmit(e) {
    e.preventDefault();

    console.log(title)
    console.log(description)
    console.log(valueDebt)

    axios.post('http://localhost:3333/create/financialSimulation', {
      title: title,
      description: description,
      debtAmount: valueDebt,
      userId: 2
    })
    .then(function (response) {
      // Manipule a resposta da API aqui
      console.log(response.data.projectedInstallment);
      setProjectedValue(response.data.projectedValue);
      setProjectedInstallment(response.data.projectedInstallment);
      setSimulated(true)
    })
    .catch(function (error) {
      // Manipule os erros aqui
      setErrorForm(true)
    });
  }

  return (
    <div className="container">
      <PrivateHeader />
      <div className="content">
          {!simulated && (
            <form onSubmit={(e) => handleSubmit(e)} className="login-area">
                <h3 className="login-title">Algumas perguntas</h3>

                <div className="input-group">
                  <span className="label-input">Dê um nome para simulação:</span>
                  <input className="input-text" placeholder="Fulano" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="input-group">
                  <span className="label-input">Adicione uma descrição</span>
                  <input className="input-text" placeholder="de Silva" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div className="input-group">
                  <span className="label-input">Qual o valor da divida?</span>
                  <input className="input-text" placeholder="example@mail.com" value={valueDebt} onChange={(e) => setValueDebt(e.target.value)}/>
                </div>
                
                {errorForm && (
                  <h3 style={{ fontSize: "15px", color: "red", fontFamily: "sans-serif", fontWeight: 100 }}>Algo deu errado. Tente novamente</h3>
                )}
                <button className="btn-entrar">Simular agora</button>
            </form>
          )}
          {simulated && (
            <div>
              <div className="alert-message">
                <h2>Resultado!</h2>
                <h3>Negocie sua pendencia financeira baseada em R${projectedValue} divida em {projectedInstallment} parcelas</h3>
              </div>
              <Link to="/home" className="btn-entrar" style={{ width: "370px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>Voltar ao menu</Link>
            </div>
          )}
      </div>
    </div>
  )
}