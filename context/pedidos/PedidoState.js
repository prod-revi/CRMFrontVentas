import React, { useReducer } from 'react'
import PedidoContext from './PedidoContext'
import { 
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_DE_PRODUCTOS,
  ACTUALIZAR_EL_TOTAL
} from '../../types'
import PedidoReducer from './PedidoReducer'

const PedidoState = ({children}) => {

  // State de Pedidos
  const initialState = {
    cliente: {},
    productos: [],
    total: 0
  }

  const [ state, dispatch ] = useReducer(PedidoReducer, initialState)

  // Funcion Modificar El Cliente
  const agregarCliente = cliente => {
    // console.log(cliente)
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente
    })
  }

  const agregarProducto = productos => {
    // console.log(productos)

    let nuevoState
    if (state.productos.length > 0) {
      // Tomar el segundo arreglo y copiarle el primero
        nuevoState = productos.map( producto => {
        const nuevoObjeto = state.productos.find( prod => {
          console.log(`prod.id === producto.id :: ${prod.id} === ${producto.id} :: ${prod.id === producto.id}`)

          return prod.id === producto.id
        })
        return {...producto, ...nuevoObjeto}
      })
    } else {
      nuevoState = productos
    }

    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: nuevoState
    })
  }

  // Modifica las cantidades de los productos
  const cantidadDeProductos = producto => {
    // console.log(producto)
    dispatch({
      type: CANTIDAD_DE_PRODUCTOS,
      payload: producto
    })
  }

  // Actualizar el total del pedido
  const actualizarTotal = () => {
    dispatch({
      type: ACTUALIZAR_EL_TOTAL,
    })
  }

  return (
    <PedidoContext.Provider
      value={{
        cliente: state.cliente,
        productos: state.productos,
        total: state.total,
        agregarCliente,
        agregarProducto,
        cantidadDeProductos,
        actualizarTotal
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

export default PedidoState


