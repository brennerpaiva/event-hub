import React, { useState, useEffect } from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EventCard from "../../components/event-card";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from  "../../config/firebase"
import { useParams } from "react-router-dom";


export default function Home() {

    const usuarioEmail = useSelector(state => state.usuarioEmail)
    const [events, setEvents] = useState([]);
    const { parameter } = useParams();

    const eventRef = collection(db, "eventos");

    useEffect(() => {
      if (parameter) {       
         
        const qWhere = query(
          eventRef,
          where("usuario", "==", usuarioEmail)
        )
        loadEvents(qWhere)
        
      } else {
        const qOrderBy = query(
          eventRef,
          orderBy("criacao", "desc")
        )

        loadEvents(qOrderBy);     
      }
    
      }, [parameter]);

      async function loadEvents(q) {

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
        

    return (
        <>
        <div className="row p-5 text-center">
          <h3 className="mx-auto p-2">Eventos Publicados</h3>
          
        </div>

        <div className="row">
            { 
            events.map(item => <EventCard id={item.id} img={item.imagem} title={item.titulo} details={item.detalhes} views={item.visualizacoes}/>)
            }
        </div>
        </>
    )
}