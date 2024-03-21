import Layout from "../components/Layout"
import { useFormik } from 'formik'
import { useState } from "react"
import * as Yup from 'yup'
import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"

const NUEVO_CLIENTE = gql`
mutation nuevoCliente($input: ClienteInput){
    nuevoCliente(input: $input){
      nombre
      apellido
    }
  }    
`;

const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor{
  obtenerClientesVendedor {
    id
    nombre
    apellido
    empresa
    email
  }
}
`;

function NuevoCliente() {
    //STATES
    const [mensaje, setMensaje] = useState("");

    //ROUTING
    const router = useRouter()

    //MUTATION PARA CREAR NUEVOS CLIENTES
    const [nuevoCliente] = useMutation(NUEVO_CLIENTE
        , {
        update(cache,{data: {nuevoCliente}}){
            //OBTENER EL OBJETO DE CACHE QUE DESEAMOS ACTUALIZAR
            const {obtenerClientesVendedor} = cache.readQuery({query: OBTENER_CLIENTES_USUARIO});

            //REESCRIBIR EL CACHE (EL CACHE NUNCA SE DEBE MODIFICAR)
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data:{
                    obtenerClientesVendedor: [...obtenerClientesVendedor,nuevoCliente]
                }
            })

        }
    }
    );

    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellido: "",
            empresa: "",
            email: "",
            telefono: ""
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre del Cliente es Obligatorio'),
            apellido: Yup.string().required('El Apellido del Cliente es Obligatorio'),
            empresa: Yup.string().required('La empresa es Obligatoria'),
            email: Yup.string().email("Email No Válido").required('El Email del Cliente es Obligatorio')
        }),
        onSubmit: async (valores) => {
            // console.log(valores)
            const {nombre,apellido,empresa,email,telefono} = valores
            try {
                const {data} = await nuevoCliente({
                    variables:{
                        input:{
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                })
                router.push('/');
            } catch (error) {
                setMensaje(error.message)
                setTimeout(()=>{
                    setMensaje("")
                },3000)
            }
        }
    })

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
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    {mensaje && mostrarMensaje()}
                    <form onSubmit={formik.handleSubmit} className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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
                                placeholder="Nombre del Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                        </div>
                        {formik.errors.nombre && formik.touched.nombre ? (
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
                                placeholder="Apellido del Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido}
                            />
                        </div>
                        {formik.errors.apellido && formik.touched.apellido ? (
                            <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.apellido}</p>
                            </div>
                        ) : null}
                        <div className="mb-3">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="empresa"
                            >
                                Empresa
                            </label>
                            <input
                                id="empresa"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                                type="text"
                                placeholder="Empresa del Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.empresa}
                            />
                        </div>
                        {formik.errors.empresa && formik.touched.empresa ? (
                            <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.empresa}</p>
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
                                type="text"
                                placeholder="Email del Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>
                        {formik.errors.email && formik.touched.email ? (
                            <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}
                        <div className="mb-3">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="telefono"
                            >
                                Teléfono
                            </label>
                            <input
                                id="telefono"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                                type="tel"
                                placeholder="Telefóno del Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}
                            />
                        </div>
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-950 hover:cursor-pointer"
                            value="Registrar Cliente"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NuevoCliente