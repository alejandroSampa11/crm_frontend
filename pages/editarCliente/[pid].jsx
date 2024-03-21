import { useRouter } from "next/router"
import Layout from "../../components/Layout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ACTUALIZAR_CLIENTE, OBTENER_CLIENTE } from "../../graphql/mutations";
import Swal from "sweetalert2";

function EditarCliente() {
    // console.log(ACTUALIZAR_CLIENTE)
    //OBTENER EL ID ACTUAL
    const router = useRouter();
    const { query } = router;
    const { pid } = query

    //APOLLO
    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id: pid
        }
    });
    //ACTUALIZAR EL CLIENTE
    const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);
    // console.log(actualizarCliente)

    //SCHEMA DE VALIDACION
    const validacionSchema = Yup.object({
        nombre: Yup.string().required('El Nombre del Cliente es Obligatorio'),
        apellido: Yup.string().required('El Apellido del Cliente es Obligatorio'),
        empresa: Yup.string().required('La empresa es Obligatoria'),
        email: Yup.string().email("Email No Válido").required('El Email del Cliente es Obligatorio')
    });

    if (loading) return null;
    // console.log(data)
    // console.log(data.obtenerCliente)
    const { obtenerCliente } = data

    //MODIFICAR EL CLIENTE EN LA BD
    const actualizarInfoCliente = async (valores)=>{
        const {nombre, apellido, empresa, email, telefono} = valores
        try {
            const {data} = await actualizarCliente({
                variables:{
                    id:pid,
                    input:{
                        nombre,
                        apellido,
                        empresa,
                        email,
                        telefono
                    }
                }
            });
            //MOSTRAR ALERTA
            Swal.fire({
                title: "Actualizado!",
                text: "El Cliente Ha Sido Actualizado",
                icon: "success",
              });

            //REDIRECCIONAR
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(obtenerCliente)

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={validacionSchema}
                        enableReinitialize
                        initialValues={obtenerCliente}
                        onSubmit={(valores)=>{
                            actualizarInfoCliente(valores)
                        }}
                    >
                        {props => {
                            // console.log(props)   
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
                                            htmlFor="apellido"
                                        >
                                            Apellido
                                        </label>
                                        <input
                                            id="apellido"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-slate-600"
                                            type="text"
                                            placeholder="Apellido del Cliente"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.apellido}
                                        />
                                    </div>
                                    {props.errors.apellido && props.touched.apellido ? (
                                        <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.apellido}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.empresa}
                                        />
                                    </div>
                                    {props.errors.empresa && props.touched.empresa ? (
                                        <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.empresa}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                    </div>
                                    {props.errors.email && props.touched.email ? (
                                        <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.telefono}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-950 hover:cursor-pointer"
                                        value="Editar Cliente"
                                    />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}

export default EditarCliente