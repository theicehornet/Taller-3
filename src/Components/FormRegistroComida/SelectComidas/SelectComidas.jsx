//import useComidas from '../../../hooks/useComidas'

export default function SelectComidas({ comidas, errorc }) {
    
    return (
        <>
            {
                errorc ? (<p>{errorc}</p>) : (<select id="comidas" name="idComida">
                    <option value='' >Seleccione una comida</option>
                    {
                        comidas.map(comida => (<option key={comida.id} value={comida.id}>{comida.nombre}</option>))
                    }
                </select>)
            }
        </>
    )
}