import { useContext, useState, useEffect } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";


function ProductoResumen({ producto }) {
    const pedidoContext = useContext(PedidoContext)
    const [cantidad, setCantidad] = useState(0)
    const { cantidadProducto, actualizarTotal } = pedidoContext
    const { nombre, precio } = producto;

    useEffect(()=>{
        actualizarCantidad()
        actualizarTotal()
    },[cantidad, ])

    const actualizarCantidad = ()=>{
        const nuevoProducto = {...producto, cantidad: Number(cantidad)}
        cantidadProducto(nuevoProducto)
    }

    return (
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{nombre}</p>
                <p>$ {precio}</p>
            </div>
            <input
                type="number"
                placeholder="Cantidad"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none md:ml"
                onChange={(e)=> setCantidad(e.target.value)}
                value={cantidad}
            />
        </div>
    );
}

export default ProductoResumen;
