import { gql } from "@apollo/client";

export const OBTENER_PRODUCTOS= gql`
query obtenerProductos{
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`

export const OBTENER_PRODUCTO = gql`
query obtenerProducto($id: ID!){
  obtenerProducto(id: $id) {
    id
    nombre
    existencia
    precio
  }
}
`;

export const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor {
  obtenerClientesVendedor {
    nombre
    apellido
    empresa
    email
    id
  }
}
`;

export const OBTENER_PEDIDOS = gql`
query obtenerPedidosVendedor{
  obtenerPedidosVendedor{
    id
    pedido{
      id
      cantidad
      nombre 
    }
    cliente{
      id
      nombre
      apellido
      email
      telefono
    }
    vendedor
    fecha
    estado
    total
  }
}
`

export const MEJORES_VENDEDORES = gql`
query mejoresVendedores{
  mejoresVendedores {
    vendedor {
      nombre
      apellido
    }
    total
  }
}
`

export const MEJORES_CLIENTES = gql`
query mejoresClientes{
  mejoresClientes {
    cliente {
      nombre
      empresa
    }
    total
  }
}
`