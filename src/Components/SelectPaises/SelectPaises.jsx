import usePaises from '../../hooks/usePaises'

export default function SelectPaises() {
    const paises = usePaises();
    return (
        <select id="paises" name="paises">
            <option value="">Seleccione...</option>
            {
                paises ? paises.map(pais =>
                    <option key={pais.id} value={pais.id}>{pais.name}</option>
                )
                    : (<option>Cargando datos ...</option>)
            }
        </select>
    );
}