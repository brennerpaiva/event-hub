import { useState, useEffect } from 'react';
import './detail-events.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { db, storage } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import { useParams } from 'react-router-dom';

export default function DetailEvents(props) {
 
    const userLogado = useSelector(state => state.usuarioEmail)
    const { id } = useParams();
    const [eventData, setEventData] = useState({})
    const [urlImg, setUrlImg] = useState('')

    useEffect(() => {
        const fetchEventData = async () => {
          const eventRef = doc(db, 'eventos', id);
          const eventDoc = await getDoc(eventRef);
          setEventData(eventDoc.data());
    
          const storageRef = ref(storage, `images/${eventDoc.data().imagem}`);
          try {
            const url = await getDownloadURL(storageRef);
            setUrlImg(url);
            console.log(urlImg);
          } catch (error) {
            console.error('Erro ao buscar a URL da imagem:', error);
          }
        };
    
        fetchEventData();
      }, [id]);

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <img className='img-banner' src={urlImg ? urlImg : ''} alt="imagem do anúncio"/>
                    <h3 className='mx-auto mt-5 title'><strong>{eventData.titulo}</strong></h3>                </div>
                </div>

                <div className="row mt-5 d-flex justify-content-around">
                    <div className="col-md-3 col-sm-12 box-info p-3">
                        <ion-icon name="ticket"></ion-icon>
                        <h5><strong>Tipo</strong></h5>
                        <span className='mt-3'>{eventData.titulo}</span>
                    </div>
                    
                    <div className="col-md-3 col-sm-12 box-info p-3">
                        <ion-icon name="ticket"></ion-icon>
                        <h5><strong>Data</strong></h5>
                        <span className='mt-3'>{eventData.data}</span>
                    </div>

                    <div className="col-md-3 col-sm-12 box-info p-3">
                        <ion-icon name="ticket"></ion-icon>
                        <h5><strong>Hora</strong></h5>
                        <span className='mt-3'>{eventData.hora}</span>
                    </div>
                </div>

                <div className="row box-details mt-5 mx-auto text-center">
                    <h5 className="mx-auto"><strong>Detalhes do Evento</strong></h5>
                    <p className="text-justify p-3">{eventData.detalhes}</p>
                </div>
                
                {
                    userLogado === eventData.usuario ?
                    <Link to="" className="btn-edit">Editar<ion-icon name="create"></ion-icon></Link>
                    : ''
                }
        </>
    )
}