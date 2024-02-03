import SelectPaises from '../SelectPaises/';
import { useRegisterForm } from '../../hooks/useRegisterForm'

export default function FormRegister() {
    const { error, sendRegister, validateForm } = useRegisterForm();

    const handleSubmitFormRegister = (event) => {
        event.preventDefault();
        const fields = new window.FormData(event.target)
        const data = {
            userName: fields.get("userName"),
            passw: fields.get("passw"),
            passwconfirm : fields.get("passwconfirm"),
            codpais : parseInt(fields.get("paises")),
            caloriasmax : parseInt(fields.get("caloriasmax")),
        }
        if (validateForm(data)) {
            sendRegister(data);
        }
    }


    return (
        <>
            <form method="POST" onSubmit={handleSubmitFormRegister} >
                <label htmlFor="userName">Ingrese su usuario:</label>
                <input id="userName" name="userName" placeholder="Luis" />
                <label htmlFor="userPassw">Ingrese su contrase�a:</label>
                <input id="userPassw" type="password" placeholder="Alcachofa" name="passw" />
                <label htmlFor="userPasswConfirm">Confirme su contrase�a:</label>
                <input id="userPasswConfirm" type="password" placeholder="Alcachofa" name="passwconfirm" />
                <label htmlFor="paises">Seleccione su pa�s</label>
                <SelectPaises />
                <label htmlFor="CaloriasDiarias">Ingres� la cantidad de CaloriasDiarias:</label>
                <input id="CaloriasDiarias" name="caloriasmax" placeholder="5000" />
                <button type="submit" id="btn_registro" >Registrarse</button>
            </form>
            {
                error && <p>{error }</p>
             }
        </>
    )
}