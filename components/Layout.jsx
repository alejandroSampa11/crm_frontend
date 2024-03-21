import React from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Header from "./Header";

function Layout({ children }) {
  const router = useRouter();
  const pathname = router.asPath;
  // console.log(pathname);
  return (
    <>
      <Head>
        <title>CRM - Administración de Clientes</title>
      </Head>
      {pathname === "/login" || pathname === '/nuevaCuenta' ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>
            {children}
          </div>
        </div>
      ) : (
        <div className="bg-gray-300 min-h-screen ">
          <div className="sm:flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header/>
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
