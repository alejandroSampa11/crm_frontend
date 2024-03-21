import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import { OBTENER_PRODUCTOS } from '../../graphql/queries';
import { useContext, useEffect, useState } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';


function AsignarProductos() {

    const [productos, setProductos] = useState({})

    const pedidoContext = useContext(PedidoContext)
    const {agregarProducto} = pedidoContext

    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS)

    useEffect(()=>{
        agregarProducto(productos)
    },[productos])

    const seleccionarProducto = (producto)=>{
        setProductos(producto)
    }

    if(loading) return null
    const {obtenerProductos} = data
    // console.log(obtenerProductos)
    return (
        <>
            <p className='mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Seleccione los Productos</p>
            <Select
                className='mt-3'
                options={obtenerProductos}
                isMulti={true}
                onChange={(opcion) => seleccionarProducto(opcion)}
                getOptionValue={(opciones) => opciones.id}
                getOptionLabel={(opciones) => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                placeholder="Seleccione el Producto"
                noOptionsMessage={() => "No Hay Resultados"}
            />
        </>
    )
}

export default AsignarProductos