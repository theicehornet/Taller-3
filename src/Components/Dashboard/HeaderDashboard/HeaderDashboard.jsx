import './HeaderDashboard.css';

export default function HeaderDashboard() {
    return (
        <nav className="HeaderDashboard">
            <ul>
                <li>
                    <a href="#FormRegistroAlimenticio">Agregar Comida</a>
                </li>
                <li>
                    <a href="#RegistrosAlimenticios">Registros Alimenticios</a>
                </li>
                <li>
                    <a href="#Informes">Informe</a>
                </li>
            </ul>
        </nav>
    )
}