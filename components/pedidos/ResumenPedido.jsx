import { useContext } from "react"
import PedidoContext from "../../context/pedidos/PedidoContext"
import ProductoResumen from "./ProductoResumen"

function ResumenPedido() {
    const pedidoContext = useContext(PedidoContext)
    const { productos } = pedidoContext
    // console.log(productos)
    return (
        <>
            <p className='mt-5 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>3.- Ajuste las Cantidades del Producto</p>
            {productos.length > 0 ? (
                <>
                    {productos.map((producto) => (<ProductoResumen key={producto.id} producto={producto}/>))}
                </>
            ) : (
                <p className="mt-5 text-sm">Aún No Hay Productos</p>
            )}
        </>
    )
}

export default ResumenPedido