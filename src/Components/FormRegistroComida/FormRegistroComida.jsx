import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SelectComidas from "./SelectComidas/SelectComidas";
import useRegisterComidaForm from '../../hooks/useRegisterComidaForm'
import { useState } from "react";

const defaultTheme = createTheme();


export default function FormRegistroComida() {
    const { error, sendRegisterComida, validateForm, registroEnviado, comidas, errorComidas, user } = useRegisterComidaForm()
    const [unidadAConsumir, setUnidadAConsumir] = useState('')

    const handleChange = (event) => {
        const currentIdFood = event.target.value;
        const filterFood = comidas.filter(comida => comida.id == parseInt(currentIdFood))
        if (filterFood.length == 0) {
            setUnidadAConsumir('')
        } else {
            setUnidadAConsumir(filterFood[0].unidad)
        }
    }

    const handleSubmitRegistroComida = (event) => {
        event.preventDefault();
        const fields = new window.FormData(event.target);
        const plato = {
            "idAlimento": parseInt(fields.get("idComida")),
            "cantidad": fields.get("cantidad"),
            "fecha": fields.get("fechaConsumo"),
            "unidadConsumida": unidadAConsumir,
        }
        if (validateForm(plato)) {
            sendRegisterComida(plato)
        }
    }

    return (
        <>
            {
                user != undefined ?
                    <>
                        <ThemeProvider theme={defaultTheme}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <AddBoxOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h2" variant="h3">
                                        Registrar Comida
                                    </Typography>
                                    <Typography component="h3" variant="h5">
                                        Llene el formulario para llevar un registro de sus comidas
                                    </Typography>
                                    <Box component="form" onSubmit={handleSubmitRegistroComida} noValidate sx={{ mt: 1 }}>
                                        <SelectComidas comidas={comidas} onChange={handleChange} />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="fechaConsumo"
                                            type="date"
                                            id="fechaConsumo"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="cantidad"
                                            label={`Ingrese la cantidad a consumir en(${unidadAConsumir})`}
                                            type="text"
                                            id="cantidad"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Registrar Comida
                                        </Button>
                                        <Grid container>
                                            <Grid item>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Container>
                        </ThemeProvider>
                    </>
                    :
                    <p>Usted no se encuentra logueado</p>
            }
            {
                registroEnviado && <p>Se ha enviado el registro</p>
            }
            {
                error && <p>{error}</p>
            }
            {
                errorComidas && <p>{errorComidas}</p>
            }
           
        </>
    )
}