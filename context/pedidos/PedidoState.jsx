import { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL,
    RESETEAR
} from '../../types/index'

const PedidoState = ({children})=>{
    //STATE DE PEDIDOS
    const initialState = {
        cliente: {},
        productos:[],
        total: 0
    }
    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    //MODIFICA EL CLIENTE
    const agregarCliente = (cliente)=>{
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    //MODIFICA LOS PRODUCTOS
    const agregarProducto = (productosSeleccionados) =>{
        let nuevoState;
        if(state.productos.length > 0){
            //TOMAR DEL 2DO ARREGLO, UNA COPIA PARA ASIGNARLO AL PRIMERO
            nuevoState = productosSeleccionados.map(producto => {
                const nuevoObjeto = state.productos.find(productoState =>productoState.id === producto.id);
                return {...producto,...nuevoObjeto}
            })

        }else{
            nuevoState = productosSeleccionados
        }
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    //RESETEAR
    const resetearProducto=()=>{
        dispatch({
            type: RESETEAR
        })
    }

    //MODIFICA LAS CANTIDADES DE LOS PRODUCTOS
    const cantidadProducto = (nuevoProducto)=>{
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const actualizarTotal = ()=>{
        dispatch({
            type: ACTUALIZAR_TOTAL,
            // payload: 
        })
    }


    return(
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                agregarCliente,
                agregarProducto,
                cantidadProducto,
                actualizarTotal,
                resetearProducto
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;