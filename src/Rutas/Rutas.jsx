import { Route, Routes } from 'react-router-dom'
import SignIn from '../Components/SingIn/SignIn'
import Header from '../Components/Header'
import SignUp from '../Components/SingUp/SignUp'
import Dashboard from '../Components/Dashboard'
import Home from '../Components/Home/Home'


export default function Rutas() {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/RegistroUsuario' element={<SignUp />} />
            <Route path='/InicioSession' element={<SignIn />} />
            <Route path='/Dashboard' element={<><Header /><Dashboard /></>} />
    </Routes>)
}