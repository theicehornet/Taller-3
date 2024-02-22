import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import fetchUsuariosPorPais from '../../../../Services/fetchUsuariosPorPaises';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './Mapa.css'
export default function MapaUsuarios() {
    const paisesStored = useSelector((store) => store.paisesSlice.paisesStored)
    const userData = useSelector((store) => store.userSlice.userLogged)
    const [paisesDatosMapa, setPaisesDatosMapa] = useState([])

    useEffect(() => {
        const usersPerCountry = async () => {
            const usersCountry = await fetchUsuariosPorPais(userData);
            let paisesFiltrados = []
            usersCountry.forEach(userPerCountry => {
                let paisEncontrado = paisesStored.find(pais => pais.name == userPerCountry.name)
                if (paisEncontrado != null) {
                    let obj = {
                        id: userPerCountry.id,
                        name: userPerCountry.name,
                        cantidadDeUsuarios: userPerCountry.cantidadDeUsuarios,
                        latitude: paisEncontrado.latitude ,
                        longitude: paisEncontrado.longitude ,
                    }
                    paisesFiltrados.push(obj);
                }
            })
            setPaisesDatosMapa(paisesFiltrados);
        }
        usersPerCountry();

    }, [paisesStored, userData])
    console.log(paisesDatosMapa);
    return (
        <article id="Mapa">
            {
                paisesDatosMapa.length == 0 ? <p>Cargando...</p> :
                    (
                        <MapContainer center={[-34.901659, -56.188707]} zoom={5}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {paisesDatosMapa.map(datos => (
                                <Marker position={[parseFloat(datos.latitude), parseFloat(datos.longitude)]} key={datos.id}>
                                    <Popup>
                                        La cantidad de usuarios en {datos.name} es: {datos.cantidadDeUsuarios}
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )
            }
        </article>
    )
}