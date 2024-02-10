

export default async function fetchUsuariosPorPais(userData) {
    try {
        const response = await fetch(`https://calcount.develotion.com/usuariosPorPais.php`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": userData.apiKey,
                "iduser": userData.id,
            },
        })
        if (!response.ok) {
            throw new Error("Hubo un error al conseguir las comidas")
        }
        const data = await response.json();
        const paisesCantidadUsuarios = data.paises;
        return paisesCantidadUsuarios;
    } catch (error) {
        throw new Error('Ocurrio un error al conseguir los registros de los usuarios por pais');
    }

}