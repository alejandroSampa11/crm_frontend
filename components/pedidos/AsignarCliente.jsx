import Select from 'react-select';
import { useState, useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { OBTENER_CLIENTES_USUARIO } from '../../graphql/queries';
import PedidoContext from '../../context/pedidos/PedidoContext';

// const clientes = [
//     { id: 1, nombre: 'Jose' },
//     { id: 2, nombre: 'Ale' },
//     { id: 3, nombre: 'Jose Ale' }
// ]

function AsignarCliente() {

    const [cliente, setCliente] = useState([])

    //CONTEXT DE PEDIDOS
    const pedidoContext = useContext(PedidoContext)
    const {agregarCliente} = pedidoContext

    //CONSULTAR BD
    const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO)
    // console.log(data)
    // console.log(loading)
    // console.log(error)

    useEffect(() => {
        agregarCliente(cliente)
    }, [cliente])

    const seleccionarCliente = (cliente) => {
        setCliente(cliente)
    }

    //RESULTADOS DE LA CONSULTA
    if(loading) return null;
    const {obtenerClientesVendedor} = data
    return (
        <>
            <p className='mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1.- Asigna un Cliente al Pedido</p>
            <Select
                className='mt-3'
                options={obtenerClientesVendedor}
                onChange={(opcion) => seleccionarCliente(opcion)}
                getOptionValue={(opciones) => opciones.id}
                getOptionLabel={(opciones) => `${opciones.nombre} ${opciones.apellido}`}
                placeholder="Seleccione el Cliente"
                noOptionsMessage={() => "No Hay Resultados"}
            />
        </>
    )
}

export default AsignarCliente