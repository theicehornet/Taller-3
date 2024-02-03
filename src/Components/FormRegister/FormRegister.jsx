import SelectPaises from '../SelectPaises/';
export default function FormRegister() {
    const handleSubmitFormRegister = (event) => {
        event.preventDefault();
        const fields = new window.FormData(event.target)
        const userName = fields.get("userName")
        const passw = fields.get("passw")
        const passwconfirm = fields.get("passwconfirm")
        const codpais = fields.get("codpais")
        const caloriasmax = fields.get("caloriasmax")

    }
    return (
        <form method="POST" onSubmit={handleSubmitFormRegister} >
            <label htmlFor="userName">Ingrese su usuario:</label>
            <input id="userName" name="userName" placeholder="Luis" />
            <label htmlFor="userPassw">Ingrese su contraseña:</label>
            <input id="userPassw" placeholder="Alcachofa" name="passw" />
            <label htmlFor="userPasswConfirm">Confirme su contraseña:</label>
            <input id="userPasswConfirm" name="passwconfirm"/>
            <label htmlFor="paises" name="codpais">Seleccione su país</label>
            <SelectPaises />
            <label htmlFor="CaloriasDiarias">Ingresé la cantidad de CaloriasDiarias:</label>
            <input id="CaloriasDiarias" name="caloriasmax" placeholder="5000" />
            <button type="submit" id="btn_registro" >Registrarse</button>
        </form>
    )
}