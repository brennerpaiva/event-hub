import React, { useState } from "react";
import "./login.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login1() {
    signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Usuario logado')
            })
            .catch((error) => {
                alert(error)
            })
    }

  return (
    <div>

      <div class="login-content d-flex align-itens-center">
        <form class="form-signin mx-auto my-auto">
        <h1 class="h3 mb-3 font-weight-bold text-white">Login</h1>
        <input
          onChange={(e)=> setEmail(e.target.value)}        
          type="email"
          id="inputEmail"
          class="form-control my-2"
          placeholder="Seu email"
          required
          autofocus
        />
        <input
          onChange={(e)=> setPassword(e.target.value)} 
          type="password"
          id="inputPassword"
          class="form-control my-2"
          placeholder="Senha"
          required
        />
        <button 
        class="btn btn-lg btn-primary btn-block my-2" 
        type="button"
        onClick={login1}>
          Login
        </button>
        <div className="login-options">
          <a href="#" className="mx-2">Recuperar Senha</a>
          <a href="#" className="mx-2">Cadastrar-se</a>
        </div>
      </form>
    </div>
    </div>
  );
}
