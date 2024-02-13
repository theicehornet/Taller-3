/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComidas({ comidas, onChange }) {
    
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="idComida">Comidas</InputLabel>
                <Select
                    labelId="idComida"
                    id="idComida"
                    label="Comidas"
                    name="idComida"
                    onChange={onChange}
                >
                    {
                        comidas.length > 0 ?
                            comidas.map(comida => <MenuItem key={comida.id} value={comida.id}>{comida.nombre}</MenuItem>)
                            : <MenuItem>Cargando...</MenuItem>
                    }
                </Select>
            </FormControl>
        </Box>
    )
}