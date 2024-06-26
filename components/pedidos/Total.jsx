import { useContext } from "react"
import PedidoContext from "../../context/pedidos/PedidoContext"

function Total() {
    const pedidoContext = useContext(PedidoContext)
    const {total} = pedidoContext
    // const total = 200
  return (
    <div className="flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-200">
        <h2 className="text-gray-800 text-lg">Total a Pagar:</h2>
        <p className="text-gray-800 mt-0">${total}</p>
    </div>
  )
}

export default Total