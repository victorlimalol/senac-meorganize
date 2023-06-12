import React, { useState } from "react";
import axios from "axios";
import './styles.css'
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [ fistname, setFirstName ] = useState("");
  const [ lastname, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ monthlyIncome, setMonthlyIncome ] = useState(0);
  const [ peopleAtHome, setPeopleAtHome ] = useState(0);
  const navigate = useNavigate();

  const [errorForm, setErrorForm] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3333/signup', {
      firstname: fistname,
      lastname: lastname,
      email: email,
      password: password,
      monthlyIncome: monthlyIncome,
      peopleAtHome: peopleAtHome
    })
    .then(function (response) {
      // Manipule a resposta da API aqui
      console.log(response.data);
      navigate('/login')
    })
    .catch(function (error) {
      // Manipule os erros aqui
      setErrorForm(true)
    });
  }

  return (
    <div className="container">
      <Header />
      <div className="content">
          <form onSubmit={(e) => handleSubmit(e)} className="login-area">
              <h3 className="login-title">Cadastrar</h3>

              <div className="input-group">
                <span className="label-input">Nome</span>
                <input className="input-text" placeholder="Fulano" value={fistname} onChange={(e) => setFirstName(e.target.value)}/>
              </div>

              <div className="input-group">
                <span className="label-input">Sobrenome</span>
                <input className="input-text" placeholder="de Silva" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
              </div>

              <div className="input-group">
                <span className="label-input">E-mail</span>
                <input className="input-text" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>

              <div className="input-group">
                <span className="label-input">Senha</span>
                <input className="input-text" placeholder="************" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>

              <div className="input-group">
                <span className="label-input">Renda Mensal</span>
                <input className="input-text" placeholder="ex: 4000" type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)}/>
              </div>

              <div className="input-group">
                <span className="label-input">Quantas pessoas moram com você?</span>
                <input className="input-text" placeholder="ex: 2" type="number" value={peopleAtHome} onChange={(e) => setPeopleAtHome(e.target.value)}/>
              </div>
              
              {errorForm && (
                <h3 style={{ fontSize: "15px", color: "red", fontFamily: "sans-serif", fontWeight: 100 }}>Algo deu errado. Tente novamente</h3>
              )}
              <button className="btn-entrar">Proximo</button>
          </form>
      </div>
    </div>
  )
}