import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import { OBTENER_PRODUCTOS } from '../../schemas'
import PedidoContext from '../../context/pedidos/PedidoContext'

const AsignarPedidos = () => {

  // state local del componente
  const [ productos, setProductos ] = useState([])

  // Interactuar conla base de datos para Obtener productos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

  // 
  useEffect( () => {
    // funcion para pasar a pedidosState 
    agregarProducto(productos)
  }, [productos])

  // obtener el context 
  const pedidosContext = useContext(PedidoContext)
  const { agregarProducto } = pedidosContext

  // obtener Productos
  if (loading) return null
  const obtenerProductos = data.obtenerProductos

  const selectProducto = producto => {
    setProductos(producto)
  }

  return ( 
    <>
      <p 
        className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
      > 2. Selecciona los Productos </p>
      <Select
        className="mt-3"
        options={obtenerProductos}
        isMulti={true}
        onChange={ option => selectProducto(option) }
        getOptionValue={ option => option.id }
        getOptionLabel={ option => `${option.nombre}  --  ${option.existencia} disponible` }
        placeholder="Seleccion los productos"
        noOptionsMessage={ () => 'No hay resultados'}
      />
    </>
  )
}
 
export default AsignarPedidos