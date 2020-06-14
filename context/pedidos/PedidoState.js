import React, { useReducer, Children } from 'react'
import PedidoContext from './PedidoContext'
import { 
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_DE_PRODUCTOS
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

  return (
    <PedidoContext.Provider
      value={{
        agregarCliente
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

export default PedidoState


