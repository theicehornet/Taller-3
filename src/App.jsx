import './App.css'
import Header from './Components/Header'
import { UserProvider } from './Context/user'
import Rutas from './Rutas/'
localStorage.setItem("userData", JSON.stringify({ apiKey: "a5c61edd5c386893f9af3ed2cb669eb0", id: 1161, caloriasDiarias: 2000 }))



function App() {
  return (
      <>
          <UserProvider>
              <Header />
              <Rutas/>
          </UserProvider>
      </>
  )
}

export default App
