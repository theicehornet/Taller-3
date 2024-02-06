import './App.css'
import FormRegister from './Components/FormRegister/FormRegister'
import FormLogin from './Components/FormLogin'
import Header from './Components/Header'
import FormRegistroComida from './Components/FormRegistroComida'
import ListaRegistro from './Components/ListaRegistro'
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './Context/user'
localStorage.setItem("userData", JSON.stringify({ apiKey: "a5c61edd5c386893f9af3ed2cb669eb0", id: 1161, caloriasDiarias: 2000 }))

function App() {
  return (
      <>
          <UserProvider>
              <Header />
              <Routes>
                  <Route path='/' element={<h1>Hola papus</h1>} />
                  <Route path='/RegistroUsuario' element={<FormRegister />} />
                  <Route path='/InicioSession' element={<FormLogin />} />
                  <Route path='/RegistrarComida' element={<FormRegistroComida />} />
                  <Route path='/RegistrosComidas' element={<ListaRegistro/>} />
                  </Routes>
          </UserProvider>
      </>
  )
}

export default App
