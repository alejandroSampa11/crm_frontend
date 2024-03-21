import Layout from "../components/Layout"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { NUEVO_PRODUCTO } from "../graphql/mutations"
import { OBTENER_PRODUCTOS } from "../graphql/queries"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { useRouter } from "next/router"

function NuevoProducto() {
    //STATES
    const [mensaje, setMensaje] = useState('');
    //MUTATION
    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO,{
        update(cache,{data:{nuevoProducto}}){
            const { obtenerProductos} = cache.readQuery({query: OBTENER_PRODUCTOS})

            //REESCRIBIR EL CACHE
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos:[...obtenerProductos, nuevoProducto]
                }
            })
        }
    });

    //ROUTING
    const router = useRouter();

    //VALIDACION FORMULARIO
    const formik = useFormik({
        initialValues:{
            nombre:'',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre del Producto es Obligatorio'),
            existencia: Yup.number().required('Agrega la Cantidad Disponible').positive('No se aceptan numeros negativos').integer('La existencia debe ser números enteros'),
            precio: Yup.number().required('El Precio es Obligatorio').positive("No se Aceptan Número Negativos")
        }),
        onSubmit: async (valores)=>{
            const {nombre, existencia, precio} = valores;
            try {
                const {data} = await nuevoProducto({
                    variables:{
                        input:{
                            nombre,
                            existencia,
                            precio
                        }
                    }
                })
                setMensaje('Producto Creado Correctamente');
                setTimeout(()=>{
                    setMensaje('')
                    router.push('/productos')
                },3000)
            } catch (error) {
                console.log(error.message)
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
        <h1 className="text-2xl text-gray-800 font-light text-center">Crear Nuevo Producto</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    {mensaje && mostrarMensaje()}
                    <form 
                    onSubmit={formik.handleSubmit} 
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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
                                placeholder="Nombre del Producto"
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
                                htmlFor="existencia"
                            >
                            Cantidad Disponible
                            </label>
                            <input
                                id="existencia"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                                type="number"
                                placeholder="Cantidad Disponible"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.existencia}
                            />
                        </div>
                        {formik.errors.existencia && formik.touched.existencia ? (
                            <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.existencia}</p>
                            </div>
                        ) : null}
                        <div className="mb-3">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="precio"
                            >
                                Precio
                            </label>
                            <input
                                id="precio"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                                type="number"
                                placeholder="Precio por Unidad"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.precio}
                            />
                        </div>
                        {formik.errors.precio && formik.touched.precio ? (
                            <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null}
                        
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-950 hover:cursor-pointer"
                            value="Registrar Producto"
                        />
                    </form>
                </div>
            </div>
    </Layout>
  )
}

export default NuevoProducto