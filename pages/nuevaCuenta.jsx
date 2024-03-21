import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from '@apollo/client'
import { useState } from "react";
import {useRouter} from 'next/router'



const NUEVA_CUENTA = gql`
mutation nuevoUsuario($input: UsuarioInput) {
  nuevoUsuario(input: $input){
    id
    nombre
    apellido
    email
  }
}
`

function NuevaCuenta() {

  //STATES
  const [mensaje, setMensaje] = useState(null)

  //MUTATION PARA CRAER NUEVOS USUARIOS
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

  //ROUTING
  const router = useRouter();


  //VALIDACION DEL FORMULARIO
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre Es Obligatorio"),
      apellido: Yup.string().required("El Apellido Es Obligatorio"),
      email: Yup.string()
        .email("El Email No Es Válido")
        .required("El Email Es Obligatorio"),
      password: Yup.string()
        .required("Password No Puede Ir Vacio")
        .min(6, "Minimo 6 Caracteres"),
    }),
    onSubmit: async (valores) => {
      // console.log("Enviando");
      // console.log(valores);
      const { nombre, apellido, email, password } = valores
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              password
            }
          }
        })
        // console.log(data)
        //USUARIO CREADO CORRECTAMENTE
        setMensaje(`Se Creo Correctamente el Usuario ${data.nuevoUsuario.nombre}`);
        setTimeout(()=>{
          setMensaje(null);
          router.push('/login');
        },3000)
        

        //REDIRIGIR USUARIO PARA INICIAR SESION
      } catch (error) {
        setMensaje(error.message)
        setTimeout(()=>{
          setMensaje(null)
        },3000)

      }
    },
  });

  // if (loading) {
  //   return 'Cargando...'
  // }

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto uppercase rounded-md">
        <p>
          {mensaje}
        </p>
      </div>
    )
  }

  return (
    <Layout>
      {mensaje && mostrarMensaje()}
      <h1 className="text-center text-2xl text-white font-light">
        Crear Nueva Cuenta
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm ">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 py-6 mb-4"
          >
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                id="nombre"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                type="text"
                placeholder="Nombre del Usuario"
                onChange={formik.handleChange}
                value={formik.values.nombre}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                id="apellido"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                type="text"
                placeholder="Apellido del Usuario"
                onChange={formik.handleChange}
                value={formik.values.apellido}
              />
            </div>
            {formik.touched.nombre && formik.errors.apellido ? (
              <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.apellido}</p>
              </div>
            ) : null}
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                type="email"
                placeholder="Email del Usuario"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            {formik.errors.email ? (
              <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                type="password"
                placeholder="Password del Usuario"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            {formik.errors.password ? (
              <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-950 hover:cursor-pointer"
              value="Crear Cuenta"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NuevaCuenta;
