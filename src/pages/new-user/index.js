import React, { useState } from "react";
import "./new-user.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function NewUser(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)


    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true)

        if (email !== "" && password !== "") {
          await createUserWithEmailAndPassword(auth, email, password)
          .then(() =>{
            alert("conta criada com sucesso")
            setLoading(false)
          })
          .catch((error) => {
            alert(error)
            setLoading(false)
          })
    
        } else {
          alert("Preencha todos os campos");
        }
      }

    return(
        <div className="register-content d-flex align-itens-center">
            <form className="text-center form-login m-auto">
                <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="email"></input>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control my-2" placeholder="senha"></input>
                <button onClick={handleRegister} type="button" className="btn-lg btn-cadastro btn-block mt-3 mb-5">Cadastrar</button>
                {
                    loading ? <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                    </div> : <div></div>
                }
                
            </form>
            
        </div>
    )
}

