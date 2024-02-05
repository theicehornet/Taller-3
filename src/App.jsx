import './App.css'
import FormRegister from './Components/FormRegister/FormRegister'
import FormLogin from './Components/FormLogin'
import Header from './Components/Header'
import FormRegistroComida from './Components/FormRegistroComida'
import ListaRegistro from './Components/ListaRegistro'
import { Route, Routes } from 'react-router-dom'
localStorage.setItem("userData", JSON.stringify({ apiKey: "a5c61edd5c386893f9af3ed2cb669eb0", id: 1161, caloriasDiarias: 2000 }))

function App() {
  return (
      <>
          <Header />
          <Routes>
              <Route path='/Register' element={<FormRegister />} />
              <Route path='/login' element={<FormLogin />} />
              <Route path='/' element={<FormRegistroComida />} />
              <Route path='/RegistrosComidas' element={<ListaRegistro/>} />
          </Routes>
      </>
  )
}

export default App
