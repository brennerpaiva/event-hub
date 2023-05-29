import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { storage, db } from "../../config/firebase";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, updateDoc, collection, doc, getDoc} from "firebase/firestore"
import { useParams } from "react-router-dom";

import "./post-events.css"

export default function PostEvents(){

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [details, setDetails] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const [msgType, setMsgType] = useState('')
    const [loading, setLoading] = useState(false)
    const { id } = useParams();

     useEffect(() => {
        if(id) {
            const editEventData = async () => {
            const Ref = doc(db, 'eventos', id);
            const eventDoc = await getDoc(Ref);
            setTitle(eventDoc.data().titulo);
            setType(eventDoc.data().tipo);
            setDetails(eventDoc.data().detalhes);
            setDate(eventDoc.data().data);
            setTime(eventDoc.data().hora);
            }
            editEventData();
        } else {
            return
        }
        
    
        //   const storageRef = ref(storage, `images/${eventDoc.data().imagem}`);
        //   try {
        //     const url = await getDownloadURL(storageRef);
        //     setUrlImg(url);
        //     setLoading(false)
        //   } catch (error) {
        //     console.error('Erro ao buscar a URL da imagem:', error);
        //   }
         }, [loading])
 
    async function update() {
        
        // setLoading(true)
        const docRef = doc(db, "eventos", id)
        await updateDoc(docRef, {
            titulo: title,
            tipo: type,
            detalhes: details,
            data: date,
            hora: time,      
          })
          .then(() => {
            alert("Evento atualizado com sucesso!")
          })
          .catch((error) => {
            alert(error)
          })
    }     
        


    async function register() {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytes(storageRef, image);
        // setLoading(true)
        
        await addDoc(collection(db, "eventos"), {
            titulo: title,
            tipo: type,
            detalhes: details,
            data: date,
            hora: time,
            usuario: usuarioEmail,
            visualizacoes: 0,
            imagem: image.name ? image.name : "",
            publico: true,
            criacao: new Date()
          })
          .then(() => {
                setMsgType("sucess")
                // setLoading(false)
                
                uploadTask
                .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
                })
                .then((url) => {
                setImage(url);
                })
                .catch((error) => {
                alert("Erro ao fazer upload da imagem:", error);
                });           
          })
        .catch((error) => {
              console.log("erro ao registrar" + error);
              setMsgType("error")
            //   setLoading(false)
            });
        }

    return(
        <>
        <div className="col-12 mt-5 ">
            <div className="row ">
                <h3 className="mx-auto font-weight-bold text-center">{id ? "Editar Evento" : "Novo Evento"}</h3>
                
            </div>

            <form>
                <div className="form-group">
                    <label>Titulo</label>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" value={title && title}/>
                </div>

                <div className="form-group">
                    <label>Tipo do Evento</label>
                    <select  onChange={(e) => setType(e.target.value)} className="form-control" value={type && type}>
                        <option disabled selected value>- Selecione o tipo de evento -</option> 
                        <option >Festa</option>
                        <option >Teatro</option>
                        <option >Show</option>
                        <option >Evento</option>
                    </select>
                </div>

                
                <div className="form-group">
                    <label>Descrição do Evento</label>
                    <textarea onChange={(e) => setDetails(e.target.value)} className="form-control" rows="3" value={details && details}></textarea>
                </div>

                <div className="form-group row">
                    <div className="col-6">
                        <label>Data:</label> <br/>
                        <input onChange={(e) => setDate(e.target.value)} className="form-control" type="date" value={date && date}/>
                    </div>
                    <div className="col-6">
                        <label>Hora:</label> <br/>
                        <input onChange={(e) => setTime(e.target.value)} className="form-control" type="time" value={time && time} />
                    </div>
                </div>

                { id ? "" :
                <div className="form-group">
                        <label>Carregue uma imagem:</label> <br/>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                </div>
                }

                <div className="row">
                    {<button className="mx-auto" onClick={id ? update : register} type="button">{id ? "Atualizar Evento" : "Novo Evento"}</button> }
                    {loading === true && <div class="spinner-border text-secondary mx-auto" role="status"></div>}
                </div>

                <div className="msg-login text-center mt-3">                   
                    {msgType === "sucess" && <span>Evento Publicado com sucesso!</span>}
                    {msgType === "error" && <span>Não foi possível publicar o evento!</span>}                  
                </div>
            </form>
        </div>
        </>
    )
}