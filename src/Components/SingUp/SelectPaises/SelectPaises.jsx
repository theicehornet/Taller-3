
//import fetchPaises from "../../../Services/fetchPaises";
import {useState,useEffect,useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { SetPaises } from '../../../app/slices/paisesSlice';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectPaises() {
    const [pais, setPais] = useState('');
    const paisesStored = useSelector((store) => store.paisesSlice.paisesStored);
    const dispatcher = useDispatch()
    const [paises, setPaises] = useState([])
    const [error, setError] = useState('')

    const getPaises = useCallback(async () => {
        try {
            if (localStorage.getItem("paisesData") == null) {
                dispatcher(SetPaises())
            }
            setPaises(await paisesStored);
        } catch (err) {
            setError(err);
        }
    }, [])
    
    useEffect(() => {
        getPaises();
    }, [getPaises])

    const handleChange = (event) => {
        setPais(event.target.value);
    };
    
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Paises</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pais}
                    label="Paises"
                    name="PaisSelect"
                    onChange={handleChange}
                >
                    {
                        error ? <MenuItem>hubo un error</MenuItem>
                            :
                            paises.length > 0 ?
                            paises.map(pais => <MenuItem key={pais.id} value={pais.id}>{pais.name}</MenuItem>) : <MenuItem>Cargando...</MenuItem>
                    }
                </Select>
            </FormControl>
        </Box>
    );
}