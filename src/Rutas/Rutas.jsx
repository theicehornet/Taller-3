import { Route, Routes } from 'react-router-dom'
import InformeCalorias from '../Components/InformeCalorias/InformeCalorias'
import AnalisisComida from '../Components/AnalisisComida/AnalisisComida'
import FormRegistroComida from '../Components/FormRegistroComida'
import ListaRegistro from '../Components/ListaRegistro'
import SignIn from '../Components/SingIn/SignIn'
import Header from '../Components/Header'
import SignUp from '../Components/SingUp/SignUp'


export default function Rutas() {
    return (
        <Routes>
            <Route path='/' element={<><Header /><h1>Hola papus</h1></>} />
            <Route path='/RegistroUsuario' element={<SignUp />} />
            <Route path='/InicioSession' element={<SignIn />} />
            <Route path='/RegistrarComida' element={<><Header/><FormRegistroComida /></>} />
            <Route path='/RegistrosComidas' element={<><Header /><ListaRegistro /></>} />
            <Route path='/InformeComidas' element={<><Header /><InformeCalorias /></>} />
            <Route path='/AnalisisComidas' element={<><Header /><AnalisisComida /></>} />
    </Routes>)
}