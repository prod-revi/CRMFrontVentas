import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import { OBTENER_CLIENTES_USUARIO } from '../../schemas'
import PedidoContext from '../../context/pedidos/PedidoContext'

// const clients = [
//   { id: 1123, nombre: 'pepe'},
//   { id: 312, nombre: 'juana'},
//   { id: 3452, nombre: 'alberto' }
// ]

const AsignarCliente = () => {
  // state local cliente
  const [ client, setClient ] = useState([])
  // Context de pedidos
  const pedidoContext = useContext(PedidoContext)
  const { agregarCliente } = pedidoContext
  // Consutlar a la base de datos para los clientes
  const { data, loading, error } =  useQuery(OBTENER_CLIENTES_USUARIO)

  useEffect( () => {
    // console.log(client)
    agregarCliente(client)
  }, [client])

  const selectClient = clients => {
    setClient(clients)
  }

  // Resultados de la consulta
  // if (loading) return 'Cargando Clientes...'
  if (loading) return null

  const { obtenerClientesVendedor } = data

  return (
    <>
      <p 
        className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
      >1. Asigna un cliente al pedido </p>
      <Select
        className="mt-3"
        options={obtenerClientesVendedor}
        // isMulti={true}
        onChange={ option => selectClient(option) }
        getOptionValue={ clients => clients.id }
        getOptionLabel={ clients => clients.nombre }
        placeholder="Busque cliente"
        noOptionsMessage={ () => 'No hay resultados'}
      />
    </>

  )
}
 
export default AsignarCliente