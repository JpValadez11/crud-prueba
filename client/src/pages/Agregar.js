import React, {useState, useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Agregar.css";
import axios from "axios";
import { toast } from "react-toastify";

const initalState = {
    Nombre: "",
    FechaCons: "",
    TipoEmpresa: "",
    Comentarios: "",
    Favorita: "",
};

const Agregar = () => {
    const [state, setState] = useState(initalState);

    const { Nombre, FechaCons, TipoEmpresa, Comentarios, Favorita } = state;

    const [checkboxValue, setCheckBoxValue] = useState(false);

    const navigate = useNavigate();

    const {Id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:50010/api/get/${Id}`)
        .then((resp) => setState({...resp.data[0] }));
    }, [Id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Nombre || !FechaCons || !TipoEmpresa) {
            toast.error("Completa los campos necesarios que estan marcados con *")
        } else {
            if(!Id){
                axios
                .post("http://localhost:50010/api/post", {
                    Nombre,
                    FechaCons,
                    TipoEmpresa,
                    Comentarios,
                    Favorita: checkboxValue,
                })
                .then(() => {
                    setState({ Nombre: "", FechaCons: "", TipoEmpresa: "", Comentarios: "", Favorita: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Se agrego correctamente la empresa");
            } else {
                axios
                .put(`http://localhost:50010/api/update/${Id}`, {
                    Nombre,
                    FechaCons,
                    TipoEmpresa,
                    Comentarios,
                    Favorita,
                })
                .then(() => {
                    setState({ Nombre: "", FechaCons: "", TipoEmpresa: "", Comentarios: "", Favorita: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Se actualizo correctamente la empresa");
            }

            setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCheckBoxValue(e.target.checked);
        setState({...state, [name]: value})
        console.log(e.target.checked)
    }

    return (
        <div style={{marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="Nombre">Nombre *</label>
                <input
                type="text"
                id="Nombre"
                name="Nombre"
                placeholder="Nombre de la empresa"
                value={Nombre || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="FechaCons">Fecha de Constitucion *</label>
                <input
                type="date"
                id="FechaCons"
                name="FechaCons"
                value={FechaCons || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="TipoEmpresa">Tipo de empresa *</label>
                <select className="form-select" id="TipoEmpresa" name="TipoEmpresa" onChange={handleInputChange}>
                    <option value={'' || ""}>Seleccionar tipo de empresa</option>
                    <option value={'Distribuidor' || ""}>Distribuidor</option>
                    <option value={'Mayorista' || ""}>Mayorista</option>
                    <option value={'Usuario Final' || ""}>Usuario Final</option>
                </select>
                <label htmlFor="Comentarios">Comentarios</label>
                <input
                type="text"
                id="Comentarios"
                name="Comentarios"
                placeholder="Comentarios"
                value={Comentarios || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="Favorita">Favorita</label>
                <input
                type="checkbox"
                id="Favorita"
                name="Favorita"
                checked={checkboxValue}
                value={checkboxValue || ""}
                onChange={handleInputChange}
                />
                <input type="submit" value={Id ? "Actualizar" : "Guardar"}/>
                <Link to="/">
                    <input type="button" value="Regresar"/>
                </Link>
            </form>
        </div>
    )
}

export default Agregar;