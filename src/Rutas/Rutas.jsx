import { Route, Routes } from 'react-router-dom'
import InformeCalorias from '../Components/InformeCalorias/InformeCalorias'
import AnalisisComida from '../Components/AnalisisComida/AnalisisComida'
import FormRegister from '../Components/FormRegister/FormRegister'
import FormLogin from '../Components/FormLogin'
import FormRegistroComida from '../Components/FormRegistroComida'
import ListaRegistro from '../Components/ListaRegistro'

export default function Rutas() {
    return (
    <Routes>
        <Route path='/' element={<h1>Como tan muchachos?</h1>} />
        <Route path='/RegistroUsuario' element={<FormRegister />} />
        <Route path='/InicioSession' element={<FormLogin />} />
        <Route path='/RegistrarComida' element={<FormRegistroComida />} />
        <Route path='/RegistrosComidas' element={<ListaRegistro />} />
        <Route path='/InformeComidas' element={<InformeCalorias />} />
        <Route path='/AnalisisComidas' element={<AnalisisComida />} />
    </Routes>)
}