import { useEffect, useRef } from 'react';
import './listaRegistros.css'
import fetchEliminarRegistro from '../../../Services/fetchEliminarRegistro'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SetRegistros } from '../../../app/slices/registrosSlice';

const ENDPOINT_IMAGES = `https://calcount.develotion.com/imgs/`;

function UrlImage(idimage) {
    return ENDPOINT_IMAGES + idimage + ".png";
}

export default function ListaRegistro({ user, error, registrosMostrar, setRegistrosMostrar, getMostrarRegistros }) {
    const [registrosFiltro, setRegistroFiltro] = useState([]);
    const selectFiltro = useRef();
    const [listaError, setListaError] = useState(error);
    const dispatcher = useDispatch();

    const getFechasPermitidas = (cantDias) => {
        const d = new Date();
        let dia = d.getDate();
        let mes = d.getMonth() + 1;
        let anio = d.getFullYear();
        const fechasPermitidas = [];
        const mesescon30 = [4, 6, 9, 11];
        const mesescon31 = [1, 3, 5, 7, 8, 10, 12];

        const formatoFecha = (anio, mes, dia) => {
            return `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
        };

        fechasPermitidas.push(formatoFecha(anio, mes, dia));

        for (let i = 1; i < cantDias; i++) {
            dia -= 1;
            if (dia === 0 && mes > 1) {
                if (mes === 3) {
                    dia = 28;
                    mes = 2;
                } else if (mesescon30.includes(mes)) {
                    dia = 30;
                } else if (mesescon31.includes(mes)) {
                    dia = 31;
                }
                mes -= 1;
                fechasPermitidas.push(formatoFecha(anio, mes, dia));
            } else if (dia === 0 && mes === 1) {
                mes = 12;
                anio -= 1;
                dia = 31;
                fechasPermitidas.push(formatoFecha(anio, mes, dia));
            } else {
                fechasPermitidas.push(formatoFecha(anio, mes, dia));
            }
        }
        return fechasPermitidas;
    }

    const getRegistrosByFiltro = (filtro) => {
        if (filtro == "0") {
            setRegistroFiltro(registrosMostrar)
        }
        else if (filtro == "1") {
            const fechasPermitidas = getFechasPermitidas(7)
            setRegistroFiltro([...registrosMostrar].filter(registro => fechasPermitidas.includes(registro.fecha)))
        }else {
            //TODO FILTRO DE MES
            const fechasPermitidas = getFechasPermitidas(30)
            setRegistroFiltro([...registrosMostrar].filter(registro => fechasPermitidas.includes(registro.fecha)))
        }
    }

    function handleFiltroChange() {
        const currentFiltro = selectFiltro.current.value;
        getRegistrosByFiltro(currentFiltro);
    }

    async function eliminarRegistro(event) {
        event.preventDefault();
        const data = new window.FormData(event.target)
        const idRegistroEliminar = data.get("idRegistro");
        try {
            await fetchEliminarRegistro(user, idRegistroEliminar )
            let newregistros = [...registrosMostrar]
            let registrosFiltrados = newregistros.filter(registro => registro.id != idRegistroEliminar)
            setRegistroFiltro([...registrosFiltro].filter(registro => registro.id != idRegistroEliminar))
            dispatcher(SetRegistros(registrosFiltrados))
            setRegistrosMostrar(JSON.parse(localStorage.getItem("registrosAlimenticios")))
        } catch (err) {
            setListaError(err.message)
        }
    }

    useEffect(() => {
        setRegistroFiltro(registrosMostrar)
        let currentfiltervalue = selectFiltro.current.value;
        getRegistrosByFiltro(currentfiltervalue);
    }, [registrosMostrar])

    

    return (
        <section id="RegistrosAlimenticios">
            <h2>Registros Alimenticios</h2>
            <h3>Estos son sus registros hasta el momento</h3>
            <label htmlFor="filtrarRegistro">Filtre sus registros:</label>
            <select ref={selectFiltro} onChange={handleFiltroChange} id="filtrarRegistro" name="filtrarRegistro">
                <option value="0">Todos los registros</option>
                <option value="1">Ultima Semana</option>
                <option value="2">Ultimo mes</option>
            </select>
            {
                 registrosFiltro.length == 0 ? <p>Por ahora no tiene ningun registro</p> :
                    (<ul className="lista-registros">
                        {
                            registrosFiltro.map(registro => (
                                    <li key={registro.id}>
                                        <form onSubmit={eliminarRegistro}>
                                            <img src={UrlImage(registro.idImagenAlimento)} />
                                            <p>{registro.nombreAlimento}</p>
                                            <p>{registro.cantidad}{registro.unidadAlimento}</p>
                                            <p>{registro.fecha}</p>
                                            <input type="hidden" name="idRegistro" value={registro.id} />
                                            <button>Eliminar</button>
                                        </form>
                                    </li>
                                ))
                        }
                    </ul>)
            }
            {listaError && <p>{listaError}</p>}
        </section>
    )
}