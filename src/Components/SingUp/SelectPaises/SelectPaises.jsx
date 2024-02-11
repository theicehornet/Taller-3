
import fetchPaises from "../../../Services/fetchPaises";
import {useState,useEffect,useCallback } from 'react'

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectPaises() {
    const [pais, setPais] = React.useState('');

    const [paises, setPaises] = useState([])
    const [error, setError] = useState('')
    const getPaises = useCallback(async () => {
        try {
            const paises = await fetchPaises();
            setPaises(paises);
        }
        catch (err) {
            setError(err)
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
                        error ? <MenuItem>{error}</MenuItem>
                            :
                        paises.length > 0 ?
                            paises.map(pais => <MenuItem key={pais.id} value={pais.id}>{pais.name}</MenuItem>) : <MenuItem>Cargando...</MenuItem>
                    }
                </Select>
            </FormControl>
        </Box>
    );
}