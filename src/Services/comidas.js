export default async function fetchAlimentos( userData ) {
    try
    {
        const response = await fetch("https://calcount.develotion.com/alimentos.php", {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "apikey": userData.apiKey,
               "iduser": userData.id,
           }
       });
        if (!response.ok) {
            throw new Error("Hubo un error al conseguir las comidas")
        }
        const jsonData = await response.json();
        return jsonData.alimentos;
    } catch (error) {
        throw new Error('Ocurrio un error al conseguir las comidas');
    }

}