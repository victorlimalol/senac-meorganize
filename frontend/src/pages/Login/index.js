import React, { useState } from "react";
import axios from "axios";
import './styles.css'
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [ email, setEmail ] = useState(" ");
  const [ password, setPassword ] = useState(" ");
  const navigate = useNavigate();

  const [errorForm, setErrorForm] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3333/login', {
      email: email,
      password: password,
    })
    .then(function (response) {
      // Manipule a resposta da API aqui
      console.log(response.data);
      navigate('/home')
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
              <h3 className="login-title">Entrar</h3>

              <div className="input-group">
                <span className="label-input">Seu e-mail</span>
                <input className="input-text" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>

              <div className="input-group">
                <span className="label-input">Senha</span>
                <input className="input-text" placeholder="example@mail.com" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>

              {errorForm && (
                <h3 style={{ fontSize: "15px", color: "red", fontFamily: "sans-serif", fontWeight: 100 }}>Algo deu errado. Tente novamente</h3>
              )}
              <button className="btn-entrar">Entrar</button>
          </form>
      </div>
    </div>
  )
}