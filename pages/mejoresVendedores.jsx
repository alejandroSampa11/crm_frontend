
import { useMutation, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import { PureComponent, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MEJORES_VENDEDORES } from "../graphql/queries";



function MejoresVendedores() {
    const {data, loading, error, startPolling, stopPolling} = useQuery(MEJORES_VENDEDORES)

    useEffect(()=>{
        startPolling(1000)
        return ()=>{
            stopPolling()
        }
    },[startPolling,stopPolling])

    if(loading) return null
    // console.log(data)
    // console.log(data.mejoresVendedores)
    const {mejoresVendedores} = data
    const vendedorGrafica = [];
    mejoresVendedores.map((vendedor, index)=>{
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })
    // console.log(vendedorGrafica)
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
            <ResponsiveContainer width="99%" height={550}>
                <BarChart
                    className="mt-10"
                    width={600}
                    height={500}
                    data={vendedorGrafica}
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

export default MejoresVendedores