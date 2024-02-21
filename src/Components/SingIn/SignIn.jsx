import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { Link } from "react-router-dom";
import { useRef, useState } from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to='/'>
       GetFit{" "}  
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    let username = useRef();
    let password = useRef();
    const navigate = useNavigate();

    const [message, setMessage] = useState('')
    const [btnDisable, setBtnDisable] = useState(true)
    const { error, sendLogin, validateForm } = useLoginForm()

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (validateForm({ userName: data.get('email'), passw: data.get('password') })) {
        sendLogin({ userName: data.get('email'), passw: data.get('password') });
        setMessage("Se ha Iniciado session correctamente");
        setTimeout(function () {
            navigate('/')
        }, 2000);
    }
};


const ValidateForm = () => {
 if (username.current.value.trim() !== "" && password.current.value.trim()!=="") {
      setBtnDisable(false)
  }else {
      setBtnDisable(true)
  }
    }
  return (
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             <TextField
              inputProps={{ ref: username } }
              margin="normal"
              required
              fullWidth
              id="email"
              label="Nombre de Usuario"
              name="email"
              autoComplete="email"
              onChange={ValidateForm}
              autoFocus
            />
           <TextField
            inputProps={{ ref: password }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={ValidateForm}
            />
             <Button
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
             disabled={btnDisable}
            >
             Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item>
                  <Link to="/RegistroUsuario" variant="body2">¿No tienes una cuenta? Registrate</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
              {
                  error && <p>{error}</p>
              }
              {message && <p>{message}</p>}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
