import Header from '../Header'
import './Home.css'
import { useSelector } from "react-redux";
export default function Home() {
    const alimentos = useSelector((store) => store.alimentosSlice)
    const paises = useSelector((store) => store.paisesSlice.paisesStored)
    const user = useSelector((store) => store.userSlice.userLogged)
    console.log(user);
    console.log(paises);
    console.log(alimentos);
    return (
        <>
            <Header />
            <div className="Inicio">
                <h1>Bienvenid@ a GetFit</h1>
                <h2>Empiece a llevar un registro de sus alimentos</h2>
            </div >
        </>
    )
}