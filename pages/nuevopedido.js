import React, { useState, useContext } from 'react'
import Layout from '../components/Layout'
import AsignarCliente from '../components/pedidos/AsignarCliente'
import AsignarProductos from '../components/pedidos/AsignarProductos'
import ResumenPedido from '../components/pedidos/ResumenPedido'
import Total from '../components/pedidos/Total'
import PedidoContext from '../context/pedidos/PedidoContext'
import { useMutation } from '@apollo/client'
import { NUEVO_PEDIDO } from '../schemas'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const NuevoPedido = () => {
  const [ mensaje, guardarMensaje ] = useState(null)
  const router = useRouter()
  // Utilizar context
  const pedidoContext = useContext(PedidoContext)
  const { cliente, productos, total } = pedidoContext
  // Mutation para crear un nuevo pedido
  const [ nuevoPedido ] = useMutation(NUEVO_PEDIDO)

  const validarPedidos = () => {
    return !productos.every( prod => prod.cantidad > 0) || total === 0 || cliente.length === 0 ? 'opacity-50 cursor-not-allowed' : 'MANDALE FRUTA'
  }

  const crearNuevoPedido = async () => {
    // Remover lo no deseado de productos
    const pedido = productos.map( ({ __typename, existencia, creado, ...prod}) => prod )

    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: cliente.id,
            total,
            pedido
          }
        }
      })

      // Redireccionar
      router.push('/pedidos')
      // Mostrar alertar
      Swal.fire(
        'Correcto',
        'El pedido se registro correctamente',
        'success'
      )


    } catch (error) {
      guardarMensaje(error.message.replace('GraphQL error: ', ''))
      setTimeout( () => { guardarMensaje(null) }, 5000)
    }
  }

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Pedidos</h1>
      { mensaje && mostrarMensaje() }

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />

          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900 ${validarPedidos()}`}
            onClick={ () => crearNuevoPedido() }
          >
            REGISTRAR PEDIDO
          </button>
        </div>
      </div>


    </Layout>
  )
}

export default NuevoPedido;