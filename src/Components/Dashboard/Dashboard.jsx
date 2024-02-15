import AnalisisComida from "./AnalisisComida/AnalisisComida"
import FormRegistroComida from "./FormRegistroComida"
import InformeCalorias from "./InformeCalorias/InformeCalorias"
import ListaRegistro from "./ListaRegistro"
import { Link } from "react-router-dom";
import { useListaRegistro } from '../../hooks/useMostrarRegistros'
import './Dashboard.css'
import HeaderDashboard from "./HeaderDashboard/HeaderDashboard";

export default function Dashboard() {
    const { user, error, registrosMostrar, setRegistrosMostrar, getMostrarRegistros } = useListaRegistro()
    return (<>
        {user ? <main>
            <HeaderDashboard/>
            <h1>Dashboard</h1>
            <AnalisisComida user={user} registrosMostrar={registrosMostrar} />
            <FormRegistroComida getMostrarRegistros={getMostrarRegistros}  />
            <ListaRegistro user={user} registrosMostrar={registrosMostrar} error={error} setRegistrosMostrar={setRegistrosMostrar} />
            <InformeCalorias registrosMostrar={registrosMostrar} />
            </main>
            :
            <>
                <p>Ustes no ha <Link to={"/InicioSession"}>iniciado sesion</Link></p>
            </>}
        
    </>)
}