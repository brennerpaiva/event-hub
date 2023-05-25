import React, { useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";

import "./post-events.css"

export default function PostEvents(){

    const [msgType, setMsgType] = useState('')


    return(
        <>
        <div className="col-12 mt-5">
            <div className="row ">
                <h3 className="mx-auto font-weight-bold ">Novo Evento</h3>
                
            </div>

            <form>
                <div className="form-group">
                    <label>Titulo</label>
                    <input type="text" className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Tipo do Evento</label>
                    <select className="form-control">
                        <option value="Festa"></option>
                        <option value="Teatro"></option>
                        <option value="Show"></option>
                        <option value="Evento"></option>
                    </select>
                </div>

                
                <div className="form-group">
                    <label>Descrição do Evento</label>
                    <textarea className="form-control" rows="3"></textarea>
                </div>

                <div className="form-group row">
                    <div className="col-6">
                        <label>Data:</label> <br/>
                        <input className="form-control" type="date" />
                    </div>
                    <div className="col-6">
                        <label>Hota:</label> <br/>
                        <input className="form-control" type="time" />
                    </div>
                </div>

                <div className="form-group">
                        <label>Carregue uma imagem:</label> <br/>
                        <input className="form-control" type="file" />
                </div>
                
                <button>Publicar Evento</button>

                {msgType === 'sucess' && <span>Evento Publicado com sucesso!</span>}
                {msgType === 'erro' && <span>Não foi possível publicar o evento!</span>}
            </form>
        </div>
        </>
    )
}