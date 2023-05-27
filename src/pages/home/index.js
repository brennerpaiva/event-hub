import React, { useState, useEffect } from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EventCard from "../../components/event-card";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from  "../../config/firebase"


export default function Home() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        async function loadEvents() {
    
            const eventRef = collection(db, "eventos");
            const q = query(
              eventRef,
              orderBy("criacao", "desc"),
            );
            const unsub = onSnapshot(q, (snapshot) => {
              let lista = [];
    
              snapshot.forEach((doc) => {
                lista.push({
                  id: doc.id,
                  ...doc.data()
                });
              });
    
              setEvents(lista);
            });
          
        }
    
        loadEvents();
      }, []);

    return (
        <>
        <h1>{useSelector(state => state.usuarioEmail) }</h1>
        <h1>Logado: {useSelector(state => state.usuarioLogado) }</h1>
        

        <div className="row">
            { 
            events.map(item => <EventCard id={item.id} img={item.imagem} title={item.titulo} details={item.detalhes} views={item.visualizacoes}/>)
            }
        </div>
        </>
    )
}