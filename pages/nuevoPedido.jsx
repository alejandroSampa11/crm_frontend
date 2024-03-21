import Layout from "../components/Layout"
import AsignarCliente from "../components/pedidos/AsignarCliente"
import { useContext, useState } from "react"

//CONTEXT DE PEDIDOS
import PedidoContext from "../context/pedidos/PedidoContext"
import AsignarProductos from "../components/pedidos/AsignarProductos"
import ResumenPedido from "../components/pedidos/ResumenPedido"
import Total from "../components/pedidos/Total"
import { NUEVO_PEDIDO } from "../graphql/mutations"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import Swal from 'sweetalert2'
import { OBTENER_PEDIDOS } from "../graphql/queries"


function NuevoPedido() {

    const [mensaje, setMensaje] = useState(null)
    const router = useRouter()

    //UTILIZAR CONTEXT Y EXTRAER SUS VALORES
    const pedidoContext = useContext(PedidoContext)
    const { cliente, productos, total, resetearProducto } = pedidoContext

    

    //MUTATION PARA CREAR PEIDDO
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO,{
        update(cache, {data:{nuevoPedido}}){
            const {obtenerPedidosVendedor} = cache.readQuery({
                query: OBTENER_PEDIDOS
            })
            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data:{
                    obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
                }
            })
        }
    })
    
    const validarPedido = () => {
        if (Array.isArray(productos)) {
            return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? 'opacity-50 cursor-not-allowed' : '';
        } else {
            return 'opacity-50 cursor-not-allowed'; // Otra acción adecuada en caso de que productos no sea un arreglo
        }
    }
    
    const crearNuevoPedido = async () => {
        const { id } = cliente;
        //REMOVER LO NO DESEADO DE PRODUCTOS
        const pedido = productos.map(({ __typename, existencia, ...producto }) => producto)
        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido
                    }
                }
            })
            // console.log(data)
            //REDIRECCIONAR
            router.push('/pedidos')
            resetearProducto();
            //MOSTRAR ALERTA
            Swal.fire({
                title: "Correcto!",
                text: "El Pedido Se Registró Correctamente",
                icon: "success",
            });
        } catch (error) {
            console.log(error)
            setMensaje(error.message)
            setTimeout(()=>{
                setMensaje(null)
            },5000)
        }
    }

    const mostrarMensaje = ()=>{
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div> 
        )
    }

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />
                    <button
                        type="button"
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                        onClick={() => crearNuevoPedido()}
                    >Registrar Pedido</button>
                </div>
            </div>
        </Layout>
    )
}

export default NuevoPedido