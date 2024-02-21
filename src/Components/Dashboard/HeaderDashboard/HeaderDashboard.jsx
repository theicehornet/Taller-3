import './HeaderDashboard.css';

export default function HeaderDashboard() {
    return (
        <nav className="HeaderDashboard">
            <ul>
                <li>
                    <a href="#Informe">Informe</a>
                </li>
                <li>
                    <a href="#FormRegistroAlimenticio">Agregar Comida</a>
                </li>
                <li>
                    <a href="#RegistrosAlimenticios">Registros Alimenticios</a>
                </li>
                <li>
                    <a href="#Calorias">Calorias</a>
                </li>
                <li>
                    <a href="#Mapa">Mapa</a>
                </li>
            </ul>
        </nav>
    )
}