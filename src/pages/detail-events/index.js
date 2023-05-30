import { useState, useEffect } from 'react';
import './detail-events.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { db, storage } from '../../config/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import { useParams } from 'react-router-dom';

export default function DetailEvents(props) {
 
    const userLogado = useSelector(state => state.usuarioEmail)
    const { id } = useParams();
    const [eventData, setEventData] = useState({})
    const [urlImg, setUrlImg] = useState('')
    const [loading, setLoading] = useState(true)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        const fetchEventData = async () => {
          const eventRef = doc(db, 'eventos', id);
          const eventDoc = await getDoc(eventRef);
          setEventData(eventDoc.data());
    
          const storageRef = ref(storage, `images/${eventDoc.data().imagem}`);
          try {
            const url = await getDownloadURL(storageRef);
            setUrlImg(url);
            setLoading(false)
          } catch (error) {
            console.error('Erro ao buscar a URL da imagem:', error);
          }
        };
    
        fetchEventData();
      }, [id]);


      async function deleteEvent() {
            const docRef = doc(db, "eventos", id);
            await deleteDoc(docRef)
            .then(() => {
                alert('Evento Deletado')
                setDeleted(true)
            })
            .catch((error)=>{
                alert(error)
            })
            
          }
          

    return(
        <>
            {
            deleted ? <Navigate to='/home'/> : null
            }

            <div className="container-fluid"></div>
            {
            loading ? 
            <div className='spinner text-center'>
                <div class="spinner-border text-secondary mx-auto" role="status">
                </div>
            </div>
            :

            <div className="container-fluid p-0">
                <div className="row text-center">
                    <img className='img-banner' src={urlImg ? urlImg : ''} alt="imagem do anúncio"/>
                    <div className='col-12 text-right mt-1'>
                        <ion-icon name="eye"></ion-icon><span>{eventData.visualizacoes}</span>
                    </div>
                    <h3 className='mx-auto mt-5 title'><strong>{eventData.titulo}</strong></h3>                
                </div>

                <div className="row mt-5 d-flex justify-content-around">
                    <div className="col-md-3 col-sm-12 box-info p-3">
                        <ion-icon name="ticket"></ion-icon>
                        <h5><strong>Tipo</strong></h5>
                        <span className='mt-3'>{eventData.tipo}</span>
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
                
                <div>
                    {
                        userLogado === eventData.usuario ?
                        <Link to={`/editevents/${id}`} className="btn-edit">Editar<ion-icon name="create"></ion-icon></Link>
                        : null
                    }
                    {
                        userLogado === eventData.usuario ?
                        <Link className="btn-remove" onClick={deleteEvent}>Excluir<ion-icon name="trash-bin"></ion-icon></Link>
                        : null
                    }
                </div> 
            </div>   
        }            
        </>
    )
}