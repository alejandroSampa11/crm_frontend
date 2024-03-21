import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL,
    RESETEAR
} from '../../types/index'

export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            }
            break;
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                productos: action.payload
            }
            break;
        case CANTIDAD_PRODUCTOS:
            return {
                ...state,
                productos: state.productos.map((producto) => producto.id === action.payload.id ? producto = action.payload : producto)
            }
            break;
        case ACTUALIZAR_TOTAL:
            return{
                ...state,
                total: state.productos.reduce((nuevoTotal,articulo)=> nuevoTotal+= articulo.precio*articulo.cantidad,0)
            }
            break;
        case RESETEAR:
            return{
                ...state,
                productos:[]
            }
            break;
        default:
            return state
    }
}