import { useLoginForm } from '../../hooks/useLoginForm'

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
    return (
        <>
            <form method="POST" onSubmit={handleSubmitForm}>
                <label htmlFor="userName">Ingrese su usuario:</label>
                <input id="userName" name="userName" placeholder="Luis" />
                <label htmlFor="userPassw">Ingrese su contraseña:</label>
                <input id="userPassw" type="password" placeholder="Alcachofa" name="passw" />
                <button type="submit" id="btn_login" >Loguearse</button>
            </form>
            {
                error && <p>{ error }</p>
            }
        </>
    )
}