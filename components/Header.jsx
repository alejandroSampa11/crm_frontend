import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

function Header() {
  //QUERY DE APOLLO
  const { data, loading, client } = useQuery(OBTENER_USUARIO);
  
  //ROUTING
  const router = useRouter();

  //PROTEGER QUE NO ACCEDAMOS A DATA ANTES DE TENER RESULTADOS
  if (loading) return null;

 //SI NO HAY INFORMACION
  if(!data){
    return router.push('/login')
     
  }

  const { nombre, apellido } = data.obtenerUsuario;
  const cerrarSesion = ()=>{
    localStorage.removeItem('token');
    client.clearStore()
    router.push('/login')
  }
  return (
    <div className="sm:flex sm:justify-between mb-5">
      <p className="mr-2 mb-5 lg:mb-0">
        Bienvenido {nombre} {apellido}!!
      </p>
      <button
        onClick={()=> cerrarSesion()}
        type="button"
        className="bg-blue-800 w-full sm:w-auto uppercase text-sm font-bold rounded-md text-white py-2 px-2 shadow-md hover:bg-blue-950"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Header;
