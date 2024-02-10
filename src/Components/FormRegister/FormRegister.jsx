import SelectPaises from './SelectPaises/';
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
            <h1>Registro</h1>
            <p>Bienvenido, llene el formulario y empiece a llevar un registro de su dieta</p>
            <form method="POST" onSubmit={handleSubmitFormRegister} >
                <label htmlFor="userName">Ingrese su usuario:</label>
                <input id="userName" name="userName" placeholder="Luis" />
                <label htmlFor="userPassw">Ingrese su contraseña:</label>
                <input id="userPassw" type="password" placeholder="Alcachofa" name="passw" />
                <label htmlFor="userPasswConfirm">Confirme su contraseña:</label>
                <input id="userPasswConfirm" type="password" placeholder="Alcachofa" name="passwconfirm" />
                <label htmlFor="paises">Seleccione su país</label>
                <SelectPaises />
                <label htmlFor="CaloriasDiarias">Ingresé la cantidad de CaloriasDiarias:</label>
                <input id="CaloriasDiarias" name="caloriasmax" placeholder="5000" />
                <button type="submit" id="btn_registro" >Registrarse</button>
            </form>
            {
                error && <p>{error }</p>
             }
        </>
    )
}