import React from "react";
import { Link } from 'react-router-dom';
import './styles.css';

export function Header() {
  return(
    <div className="header">
        <h1 className="logo-text">me.organize</h1>
        <div className="area-buttons"> 
          <Link to="/signup" className="transparent-button">Cadastre-se</Link>
          <Link to="/login" className="background-button">Entrar</Link>
        </div>
      </div>
  )
}