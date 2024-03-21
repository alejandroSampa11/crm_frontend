import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/'
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