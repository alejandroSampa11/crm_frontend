import { useQuery } from "@apollo/client"
import Layout from "../components/Layout"
import { OBTENER_PRODUCTOS } from "../graphql/queries"
import Producto from "../components/Producto";
import Link from "next/link";

function Productos() {
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)
    if (loading) return null;
    // console.log(data)
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
            <Link href='/nuevoProducto'>
                <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold w-full lg:w-auto text-center">
                    Nuevo Producto
                </a>
            </Link>
            <div className="overflow-x-scroll">
                <table className="table-auto shadow-md mt-10 w-full">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2">Nombre</th>
                            <th className="w-1/5 py-2">Existencia</th>
                            <th className="w-1/5 py-2">Precio</th>
                            <th className="w-1/5 py-2">Eliminar</th>
                            <th className="w-1/5 py-2">Editar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.obtenerProductos.map((producto) => (
                            <Producto key={producto.id} producto={producto} />
                        ))}
                    </tbody>

                </table>
            </div>
        </Layout>
    )
}

export default Productos