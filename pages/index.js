import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Cliente from "../components/Cliente";
import { OBTENER_CLIENTES_USUARIO } from "../graphql/queries";

// const OBTENER_CLIENTES_USUARIO = gql`
//   query obtenerClientesVendedor {
//     obtenerClientesVendedor {
//       nombre
//       apellido
//       empresa
//       email
//       id
//     }
//   }
//  `;

export default function Home() {
  //ROUTING
  const router = useRouter();
  //CONSULTA DE APOLLO
  const { data, loading, client } = useQuery(OBTENER_CLIENTES_USUARIO);
  // console.log(data)

  if (loading) return null;

  //SI NO HAY INFORMACION
  if (!data.obtenerClientesVendedor) {
    client.clearStore();
    router.push("/login");
    return null;
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <Link href="/nuevoCliente">
        <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold w-full lg:w-auto text-center">
          Nuevo Cliente
        </a>
      </Link>
      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
