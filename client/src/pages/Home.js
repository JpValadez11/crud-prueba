import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";  


const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:50010/api/get");
        setData(reponse.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const eliminarEmpresa = (Id) => {
        if(window.confirm("¿Estas seguro de eliminar esta empresa?")){
            axios.delete(`http://localhost:50010/api/remove/${Id}`);
            toast.success("Empresa eliminada correctamente");
            setTimeout(() => loadData(), 500);
        }
    }
    return(
        <div style={{marginTop: "50px"}}>
            <Link to="/addCompany">
                <button className="btn btn-company">Agregar Empresa</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Nombre</th>
                        <th style={{textAlign: "center"}}>Fecha de Constitucion</th>
                        <th style={{textAlign: "center"}}>Tipo de Empresa</th>
                        <th style={{textAlign: "center"}}>Comentarios</th>
                        <th style={{textAlign: "center"}}>Favorita</th>
                        <th style={{textAlign: "center"}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.Nombre}</td>
                                <td>{item.FechaCons}</td>
                                <td>{item.TipoEmpresa}</td>
                                <td>{item.Comentarios}</td>
                                <td>{item.Favorita}</td>
                                <td>
                                    <div className="btn">
                                        <Link to={`/update/${item.Id}`}>
                                        <button className="btn btn-edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                                        <path d="M13.5 6.5l4 4" />
                                        </svg>
                                        </button>
                                        </Link>
                                        <button className="btn btn-delete" onClick={() => eliminarEmpresa(item.Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M4 7l16 0" />
                                        <path d="M10 11l0 6" />
                                        <path d="M14 11l0 6" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home; 