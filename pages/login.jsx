import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input:AutenticarInput){
  autenticarUsuario(input: $input){
    token
  } 
}
`;

function Login() {
  //STATES
  const [mensaje, setMensaje] = useState(null)

  //ROUTER
  const router = useRouter()


//MUTATION PARA CREAR NUEVOS USUARIOS
const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El Email No Es Válido")
        .required("El Email es Obligatorio"),
      password: Yup.string().required("El Password Es Obligatorio"),
    }),
    onSubmit: async (valores)=>{
      // console.log(valores)
      const {email, password} = valores;
      try {
        const {data} = await autenticarUsuario({
          variables:{
            input: {
              email,
              password
            }
          }
        });
        // console.log(data)
        setMensaje('Autenticando...')

        //GUARDAR EL TOKEN EN LOCALSTORAGE
        setTimeout(()=>{
          const {token} = data.autenticarUsuario;
          localStorage.setItem('token', token)
        },1000)

        //REDIRECCIONAR A CLIENTES
        setTimeout(()=>{
          setMensaje(null)
          router.push('/')
        },2000)
      } catch (error) {
        // console.log(error.message)
        setMensaje(error.message)
        setTimeout(()=>{
          setMensaje(null)
        },3000)
      }
    }
  });

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
      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm ">
          <form
            className="bg-white rounded shadow-md px-8 py-6 mb-4"
            onSubmit={formik.handleSubmit}
          >
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
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
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
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-950 hover:cursor-pointer"
              value="Iniciar Sesión"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
