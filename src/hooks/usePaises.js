import { useState, useEffect } from 'react';

export default function useFetchPaises() {
    const [paises, setPaises] = useState([]);

    useEffect(() => {
        const fetchPaises = async () => {
            try {
                const response = await fetch("https://calcount.develotion.com/paises.php", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const jsonData = await response.json();
                setPaises(jsonData.paises);
            } catch (error) {
                console.error('Error al recuperar los datos:', error);
            }
        };

        fetchPaises();
    }, []);

    return paises;
}

