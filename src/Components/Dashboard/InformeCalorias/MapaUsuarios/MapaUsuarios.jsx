import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";


export default function MapaUsuarios() {
    const paisesStored = useSelector((store) => store.paisesSlice.paisesStored);


    return (
        <article id="Mapa">
            <p>Hola soy el mapa</p>
        </article>
    )
}