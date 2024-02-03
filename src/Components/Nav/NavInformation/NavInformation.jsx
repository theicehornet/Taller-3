export default function NavInformation() {
    const userData = localStorage.getItem("userData");
    const handleClickCerrarSession = () => {
        localStorage.setItem("userData", null)
    }
    return (
        <>
            {
                userData ? (
                    <>
                        <li>
                            <a ><p>Registrarse</p></a>
                        </li>
                        <li>
                            <a ><p>Iniciar Session</p></a>
                        </li>
                    </>
                ) :
                    (
                        <li>
                            <a onClick={handleClickCerrarSession}><p>Cerrar Session</p></a>
                        </li>
                    )
            }
        </>
    )
}