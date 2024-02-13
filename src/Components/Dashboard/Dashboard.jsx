import AnalisisComida from "./AnalisisComida/AnalisisComida"
import FormRegistroComida from "./FormRegistroComida"
import InformeCalorias from "./InformeCalorias/InformeCalorias"
import ListaRegistro from "./ListaRegistro"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Dashboard() {
    const user = useSelector((store) => store.userSlice.userLogged)
    return (<>
        {user ? <>
            <h1>Dashboard</h1>
            <AnalisisComida />
            <FormRegistroComida />
            <ListaRegistro />
            <InformeCalorias />
            </>
            :
            <>
                <p>Ustes no ha <Link to={"/InicioSession"}>iniciado sesion</Link></p>
            </>}
        
    </>)
}