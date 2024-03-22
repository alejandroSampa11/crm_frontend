import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
// import fetch from 'node-fetch'
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'https://crm-backend-sw44.onrender.com'
});

const authLink = setContext((_,{headers})=>{
    //LEER EL STORAGE ALMACENADO
    const token = localStorage.getItem('token');
    return {
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;