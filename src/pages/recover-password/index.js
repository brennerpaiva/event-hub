import React, { useState } from "react";
import "./recover-password.css";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  function userRecoverPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMsg("Enviamos um link no seu email para redefinir sua senha!");
      })
      .catch((error) => {
        setMsg("Verifique se o email está correto");
      });
  }

  return (
    <>
      <div className="form-register">
        <form className="text-center form-login mx-auto mt-5">
          <h3 className="mb-3 font-weight-bold">Recuperar Senha</h3>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control my-2"
            placeholder="Email"
          />

          <div className="msg my-4 text-center">
            <span>{msg}</span>
          </div>

          <button
            onClick={userRecoverPassword}
            type="button"
            className="btn btn-lg btn-block btn-primary"
          >
            Recuperar Senha
          </button>
        </form>
      </div>
    </>
  );
}
