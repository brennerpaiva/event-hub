import React from "react";
import "./navbar.css"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


export default function NavBar() {

    const dispatch = useDispatch()

    return(
        <div>
            <nav className="navbar navbar-expand-lg ">
                <span className="navbar-brand text-white font-weight-bold" href="#">Event Hub</span>
                <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <ion-icon name="menu-outline"></ion-icon>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/home">Home</Link>
                        </li>

                        {
                            useSelector(state => state.usuarioLogado) == true ?
                        <>
                            <li className="nav-item">
                                <Link to="/">Publicar Evento</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/">Meus Eventos</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={() => dispatch({type: 'LOG_OUT'})} >Sair</Link>
                            </li>
                        </>
                        :
                        <>
                            <li className="nav-item">
                                <Link to="/newuser">Cadastrar</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/">Login</Link>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}