import Layout from '../components/Layout'
import Link from 'next/link'
import { OBTENER_PEDIDOS_VENDEDOR } from '../schemas'
import { useQuery } from '@apollo/client'
import Pedido from '../components/Pedido'

const Productos = () => {

  // Conectar a la base de datos
  const { data, loading, error} = useQuery(OBTENER_PEDIDOS_VENDEDOR)

  if (loading) return 'cargando...'

  const { obtenerPedidosVendedor } = data



  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Pedidos</h1>

      <Link href="/nuevopedido">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
          Nuevo Pedido
        </a>
      </Link>
        { obtenerPedidosVendedor.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
        ) : (
          obtenerPedidosVendedor.map( pedido => (<Pedido key={pedido.id} pedido={pedido} />))
        )}
    </Layout>
  )
}

export default Productos