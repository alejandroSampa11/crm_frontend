
import { useMutation, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import { PureComponent, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MEJORES_CLIENTES } from "../graphql/queries";

function MejoresClientes() {
    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES)

    useEffect(()=>{
        startPolling(1000)
        return ()=>{
            stopPolling()
        }
    },[startPolling,stopPolling])
    if (loading) return null
    // console.log(data)
    const { mejoresClientes } = data
    // console.log(mejoresClientes)
    const clientesGrafica = [];
    mejoresClientes.map((cliente, index) => {
        clientesGrafica[index] = {
            ...cliente.cliente[0],
            total: cliente.total
        }
    })
    // console.log(clientesGrafica)
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>
            <ResponsiveContainer width="99%" height={550}>
                <BarChart
                className="mt-10"
                    width={600}
                    height={500}
                    data={clientesGrafica}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" activeBar={<Rectangle fill="#3182CE" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>

        </Layout>
    )
}

export default MejoresClientes