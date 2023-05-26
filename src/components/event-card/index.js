import React, { useState } from "react";
import { Link } from "react-router-dom";
import './event-card.css'

export default function EventCard() {
    return(
            <div class="card col-md-3 col-sm-12" >
                <img class="card-img-top" src="https://image-placeholder.com/images/actual-size/57x57.png   " alt="Imagem de capa do card"/>
                <div class="card-body">
                    <h5 class="card-title">Título do card</h5>
                     <p class="card-text">Um exemplo de texto rápido para construir o título do card e fazer preencher o conteúdo do card.</p>
                        
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <Link href="#" class="btn btn-m btn-primary ">Visitar</Link>
                        </div>
                        <div className="footer-card col-4">
                            <ion-icon name="eye"></ion-icon>
                            <span>21</span>
                        </div>
                    </div>
                </div>
             </div>
    )
}