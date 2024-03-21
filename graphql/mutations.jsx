import { gql } from "@apollo/client"

export const ACTUALIZAR_CLIENTE = gql`
mutation actualizarCliente($id: ID!, $input: ClienteInput!){
    actualizarCliente(id: $id, input: $input){
      nombre
      email
    }
  }
`

export const OBTENER_CLIENTE = gql`
query obtenerCliente($id: ID!){
    obtenerCliente(id: $id) {
      nombre
      apellido
      email
      telefono
      empresa
    }
  }
`

export const ELIMINAR_PRODUCTO = gql`
mutation eliminarProducto($id: ID!){
    eliminarProducto(id:$id)
  }
`;

export const NUEVO_PRODUCTO = gql`
mutation nuevoProducto($input: ProductoInput){
  nuevoProducto(input: $input){
    id
    nombre
    existencia
    precio
    creado
  }
}
`

export const ACTUALIZAR_PRODUCTO = gql`
mutation actualizarProducto($id: ID!, $input: ProductoInput){
  actualizarProducto(id:$id, input:$input){
    id
    nombre
    existencia
    precio
  }
}
`
export const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input: PedidoInput){
  nuevoPedido(input:$input) {
    id
    vendedor
    pedido{
      id
      cantidad
    }
    total
    estado
  }
}
`

export const ACTUALIZAR_PEDIDO = gql`
mutation actualizarPedido($id: ID!, $input: PedidoInput){
  actualizarPedido(id:$id, input: $input){
    estado
  }
}
`

export const ELIMINAR_PEDIDO = gql`
mutation eliminarPedido($id: ID!){
  eliminarPedido(id:$id)
}
`

