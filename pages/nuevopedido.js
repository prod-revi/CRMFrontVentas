import React, { useContext } from 'react'
import Layout from '../components/Layout'
import AsignarCliente from '../components/pedidos/AsignarCliente'



const NuevoPedido = () => {

  // Utilizar context
  // const pedidoContext = useContext(PedidoContext)
  // console.log(pedidoContext)

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Pedidos</h1>

      <AsignarCliente />

    </Layout>
  )
}

export default NuevoPedido;