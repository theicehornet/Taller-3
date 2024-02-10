import { useLoginForm } from '../../hooks/useLoginForm'
import './FormLogin.css'

export default function FormLogin() {
    const { error, sendLogin, validateForm } = useLoginForm();

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const fields = new window.FormData(event.target)
        const data = {
            userName: fields.get("userName"),
            passw: fields.get("passw"),
        }
        if (validateForm(data)) {
            sendLogin(data);
        }
    }
    console.log("render")
    return (
        <>
            <h1>Bienvenido de vuelta</h1>
            <p>Agradecemos su preferencia con nosotros</p>
            <form method="POST" onSubmit={handleSubmitForm} className="LoginForm">
                <div>
                <label htmlFor="userName">Ingrese su usuario: </label>
                    <input id="userName" name="userName" placeholder="Luis" />
                </div>
                <div>
                <label htmlFor="userPassw">Ingrese su contraseña: </label>
                <input id="userPassw" type="password" placeholder="Alcachofa" name="passw" />
            </div>
                <button type="submit" id="btn_login" >Loguearse</button>
            </form>
            {
                error && <p>{ error }</p>
            }
        </>
    )
}