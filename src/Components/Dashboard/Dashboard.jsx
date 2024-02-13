import AnalisisComida from "./AnalisisComida/AnalisisComida"
import FormRegistroComida from "./FormRegistroComida"
import InformeCalorias from "./InformeCalorias/InformeCalorias"
import ListaRegistro from "./ListaRegistro"




export default function Dashboard() {
    return (<>
        <h1>Dashboard</h1>
        <AnalisisComida/>
        <FormRegistroComida />
        <ListaRegistro />
        <InformeCalorias/>
    </>)
}