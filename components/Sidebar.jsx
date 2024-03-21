import Link from "next/link"
import { useRouter } from 'next/router'

function Sidebar() {
  //ROUTING DE NEXT
  const router = useRouter();
  const pathname = router.asPath;
  // console.log(pathname)

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={pathname === "/" ? 'bg-blue-800 p-2' : "p-2"}>

          <Link href="/">
            <a className="text-white block">
              Clientes
            </a>
          </Link>
        </li>
        <li className={pathname === "/productos" ? 'bg-blue-800 p-2' : "p-2"}>
          <Link href="/productos">
            <a className="text-white block">
              Productos
            </a></Link>

        </li>
        <li className={pathname === "/pedidos" ? 'bg-blue-800 p-2' : "p-2"}>
          <Link href="/pedidos"><a className="text-white block">
            Pedidos
          </a></Link>

        </li>
      </nav>

      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black mt-2">Otras Opciones</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={pathname === "/mejoresVendedores" ? 'bg-blue-800 p-2' : "p-2"}>
          <Link href="/mejoresVendedores"><a className="text-white block">
            Mejores Vendedores
          </a></Link>

        </li>
        <li className={pathname === "/mejoresClientes" ? 'bg-blue-800 p-2' : "p-2"}>
          <Link href="/mejoresClientes"><a className="text-white block">
            Mejores Clientes
          </a></Link>

        </li>
      </nav>

    </aside>
  )
}

export default Sidebar