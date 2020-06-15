import React, { useState, useEffect,  useContext } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext'

const ProductoResumen = ({producto}) => {
  const { nombre, precio, existencia } = producto
  // obtener el context 
  const pedidosContext = useContext(PedidoContext)
  const { cantidadDeProductos, actualizarTotal } = pedidosContext
  const [ cantidad, setCantidad ] = useState(0)

  useEffect( () => {
    actualizarCantidad()
    actualizarTotal()
  }, [cantidad])

  const actualizarCantidad = () => {
    const nuevoProducto = {...producto, cantidad: Number( cantidad )}
    cantidadDeProductos(nuevoProducto)
  }

  const onChangeHandle = cantidadInput => {
    Number(cantidadInput) > existencia ? setCantidad(cantidad) : setCantidad(cantidadInput)
  }

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{nombre}</p>
        <p className="">$ {precio}</p>
      </div>
      <input 
        type="number"
        placeholder="Cantidad"
        className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        onChange={ e => onChangeHandle(e.target.value) }
        value={ cantidad || 1 }
        min="1"
        max={existencia}
      />
    </div>
  )
}
 
export default ProductoResumen