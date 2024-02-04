export default async function fetchRegistros({ userData }) {
    try {
        const response = await fetch(`https://calcount.develotion.com/registros.php?idUsuario=1161`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": "a5c61edd5c386893f9af3ed2cb669eb0",
                "iduser": "1161",
            },
        })
        if (!response.ok) {
            throw new Error("Hubo un error al conseguir las comidas")
        }
        const data = await response.json();
        const registros = data.registros;
        return registros;
    } catch (error) {
        throw new Error('Ocurrio un error al conseguir los registros');
    }

}