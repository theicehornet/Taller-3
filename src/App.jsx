import './App.css'
import FormRegister from './Components/FormRegister/FormRegister'
import FormLogin from './Components/FormLogin'
import Nav from './Components/Nav'

function App() {
    
  return (
      <>
          <header>
              <Nav/>
          </header>
          <FormRegister />
          <FormLogin/>
      </>
  )
}

export default App
