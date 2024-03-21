import Layout from "../components/Layout"
import Link from "next/link"
import { OBTENER_PEDIDOS } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import Pedido from "../components/Pedido"

function Pedidos() {

  //OBTENER PEDIDOS
  const { data, loading, error } = useQuery(OBTENER_PEDIDOS)

  if (loading) return null;
  const { obtenerPedidosVendedor } = data
  // console.log(obtenerPedidosVendedor)


  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
      <Link href="/nuevoPedido">
        <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold w-full lg:w-auto text-center">
          Nuevo Pedido
        </a>
      </Link>
      {obtenerPedidosVendedor.length === 0 ? (<p className="mt-5 text-center text-2xl">No hay Pedidos Aún</p>) : (
        obtenerPedidosVendedor.map(pedido => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))
      )}
    </Layout>
  )
}

export default Pedidos