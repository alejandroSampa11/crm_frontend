import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

function Cliente({ cliente }) {
  const { nombre, empresa, email, apellido, id } = cliente;
  //MUTATION PARA ELIMINAR EL CLIENTE
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      // Actualizar el caché después de eliminar el cliente
      cache.modify({
        fields: {
          obtenerClientesVendedor(existingClientes = [], { readField }) {
            // Eliminar el cliente eliminado del caché
            return existingClientes.filter(
              (clienteRef) => cliente.id !== readField("id", clienteRef)
            );
          },
        },
      });
    },
  });

  //ELIMINAR CLIENTE
  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "¿Deseas eliminar a este cliente?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //ELIMINAR POR ID
          const { data } = await eliminarCliente({
            variables: {
              id,
            },
          });
          // console.log(data);

          //MOSTRAR ALERTA
          Swal.fire({
            title: "Eliminado!",
            text: data.eliminarCliente,
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  //EDITAR CLIENTE
  const editarCliente = () => {
    Router.push({
      pathname: "/editarCliente/[id]",
      query: { id },
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {nombre} {apellido}
      </td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          className="flex justify-center items-center bg-red-800 rounded-sm py-2 px-4 w-full text-white text-xs uppercase font-bold"
          type="button"
          onClick={() => confirmarEliminarCliente(id)}
        >
          Eliminar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          className="flex justify-center items-center bg-green-600 rounded-sm py-2 px-4 w-full text-white text-xs uppercase font-bold"
          type="button"
          onClick={() => editarCliente()}
        >
          Editar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default Cliente;
