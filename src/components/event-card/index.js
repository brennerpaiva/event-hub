import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './event-card.css'
import { storage } from "../../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default function EventCard({ eventKey, img, title, details, views }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const storageRef = ref(storage, `images/${img}`);
    getDownloadURL(storageRef)
      .then(url => setImageUrl(url))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="card col-md-3 col-sm-12">
      <img className="card-img-top" src={imageUrl || "https://via.placeholder.com/500"} alt="Imagem de capa do card" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{details}</p>

        <div className="row d-flex align-items-center">
          <div className="col-8">
            <Link to="#" className="btn btn-m btn-primary">Visitar</Link>
          </div>
          <div className="footer-card col-4">
            <ion-icon name="eye"></ion-icon>
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
