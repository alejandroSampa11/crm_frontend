import React from 'react'
import Layout from '../../components/Layout'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { OBTENER_PRODUCTO } from '../../graphql/queries'
import { ACTUALIZAR_PRODUCTO } from '../../graphql/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

function EditarProducto() {
    //OBTENER EL ID
    const router = useRouter()
    const { query } = router
    const { pid } = query

    //OBTENER LOS VALORES DE LA BD
    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id: pid
        }
    })
    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

    // console.log(data)
    //SCHEMA DE VALIDACION
    const validacionSchema = Yup.object({
        nombre: Yup.string().required('El Nombre del Producto es Obligatorio'),
        existencia: Yup.number().required('Agrega la Cantidad Disponible').positive('No se aceptan numeros negativos').integer('La existencia debe ser números enteros'),
        precio: Yup.number().required('El Precio es Obligatorio').positive("No se Aceptan Número Negativos")
    });
    if (loading) return null;
    const { obtenerProducto } = data;
    // console.log(obtenerProducto)

    //MODIFICAR EL PRODUCTO EN LA BD
    const actualizarInfoProducto = async (valores) => {
        const { nombre, existencia, precio } = valores
        try {
            const { data } = await actualizarProducto({
                variables: {
                    id: pid,
                    input: {
                        nombre,
                        precio,
                        existencia
                    }
                }
            })
            //MOSTRAR ALERTA
            Swal.fire({
                title: "Actualizado!",
                text: "El Producto Ha Sido Actualizado",
                icon: "success",
            });

            //REDIRECCIONAR
            router.push('/productos');

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout>
            <div className="text-2xl text-gray-800 font-light">Editar Producto</div>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={validacionSchema}
                        enableReinitialize
                        initialValues={obtenerProducto}
                        onSubmit={(valores) => {
                            actualizarInfoProducto(valores)
                        }}
                    >
                        {props => {
                            return (
                                <form
                                    onSubmit={props.handleSubmit}
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
                                            placeholder="Nombre del Cliente"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.nombre}
                                        />
                                    </div>
                                    {props.errors.nombre && props.touched.nombre ? (
                                        <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.nombre}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.existencia}
                                        />
                                    </div>
                                    {props.errors.existencia && props.touched.existencia ? (
                                        <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.existencia}</p>
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
                                            placeholder="Precio del Producto"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.precio}
                                        />
                                    </div>
                                    {props.errors.precio && props.touched.precio ? (
                                        <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.precio}</p>
                                        </div>
                                    ) : null}

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-950 hover:cursor-pointer"
                                        value="Editar Producto"
                                    />
                                </form>
                            )
                        }}
                    </Formik>
                    {/* {mensaje && mostrarMensaje()} */}

                </div>
            </div>
        </Layout>
    )
}

export default EditarProducto