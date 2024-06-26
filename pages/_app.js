import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import PedidoState from '../context/pedidos/PedidoState'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <PedidoState>
        <Component {...pageProps} />
      </PedidoState>
    </ApolloProvider>
  )
}

export default MyApp
