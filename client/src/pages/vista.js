import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import "./vista.css";

const Vista = () => {
    const [info, setInfo] = userState({});

    const {Id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:50010/api/get/${Id}`)
        .then((resp) => setInfo({...resp.data[0] }));
    }, [Id]);
    return (
        <div style={{marginTop: "150px"}}>
            <div className='card'>
                <div className='card-header'>
                    <p>informacion de la empresa</p>
                </div>
                <div className='container'>
                    <strong>Id: </strong>
                    <span>{Id}</span>
                    <br />
                    <br />
                    <strong>Nombre: </strong>
                    <span>{Nombre.info}</span>
                    <br />
                    <br />
                    <strong>Fecha: </strong>
                    <span>{FechaCons.info}</span>
                    <br />
                    <br />
                    <strong>Tipo de empresa: </strong>
                    <span>{TIpoEmpresa.info}</span>
                    <br />
                    <br />
                    <strong>Comentarios: </strong>
                    <span>{Comentarios.info}</span>
                    <br />
                    <br />
                    <strong>Favorita: </strong>
                    <span>{Favorita.info}</span>
                    <br />
                    <br />
                    <Link to="/">
                    <div className='btn btn-edit'>Regresar</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Vista