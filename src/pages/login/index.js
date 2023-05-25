import React, { useState } from "react";
import "./login.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Link, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function login1() {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Usuario logado');
            dispatch({type: 'LOG_IN', usuarioEmail: email})
        })
        .catch((error) => {
            alert(error)
        })     
    }

  return (
      <div className="login-content d-flex align-itens-center">

        {
          useSelector(state => state.usuarioLogado) == true ? <Navigate to='/home'/> : null
        }

        <form className="form-signin mx-auto my-auto">
        <h1 className="h3 mb-3 font-weight-bold text-white">Login</h1>
        <input
          onChange={(e)=> setEmail(e.target.value)}        
          type="email"
          id="inputEmail"
          className="form-control my-2"
          placeholder="Seu email"
          required
          autofocus
        />
        <input
          onChange={(e)=> setPassword(e.target.value)} 
          type="password"
          id="inputPassword"
          className="form-control my-2"
          placeholder="Senha"
          required
        />
        <button 
        className="btn btn-lg btn-primary btn-block my-2" 
        type="button"
        onClick={login1}>
          Login
        </button>
        <div className="login-options">
          <Link to='/recoverpassword' className="mx-2">Recuperar Senha</Link>
          <Link to="/newuser" className="mx-2">Cadastrar-se</Link>
        </div>
      </form>
    </div>
  );
}
