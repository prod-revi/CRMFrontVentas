import React, { useState } from 'react'
import Swal from 'sweetalert2' 
import { useMutation } from '@apollo/client'
import Router from 'next/router'

import { ELIMINAR_CLIENTE, OBTENER_CLIENTES_USUARIO } from '../schemas'

const Cliente = ({ cliente }) => {

  // Mutation para eliminar cliente de cache
  const [ eliminarCliente ] = useMutation( ELIMINAR_CLIENTE, {
    update(cache) {
      // Obtener una copia del Objeto 
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO })

      // Reescribir el cache
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor : obtenerClientesVendedor.filter( clienteActual => clienteActual.id !== id )
        }
      })
    }
  } )
  
  // Mostrar mensajes
  const [mensaje, guardarMensaje] = useState()


  const { id, nombre, apellido, empresa, email } = cliente

  // Eliminar un cliente
  const confirmarEliminarCliente = () => {
    Swal.fire({
      title: 'Deseas eliminar a este cliente?',
      text: "Esta accion no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then(async (result) => {
      if (result.value) {

        try {
          // Eliminar por ID
          const { data } = await eliminarCliente({
            variables: { id }
          })

          // Mostrar la alerta
          Swal.fire(
            'Eliminado!',
            data.eliminarCliente,
            'success'
          )
        } catch (error) {
          // console.log(error)
          guardarMensaje(error.message.replace('GraphQL error: ', ''))
          setTimeout( () => {
            guardarMensaje(null)
          }, 3000)
        }

      }
    })
  }

  const editarCliente = () => {
    Router.push({
      pathname: "/editarcliente/[id]",
      query: { id }
    })
  }

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    )
  }

  return (
    <>
      { mensaje && mostrarMensaje() }

      <tr>
        <td className="border px-4 py-2">{nombre} {apellido}</td>
        <td className="border px-4 py-2">{empresa}</td>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2">
          <button
            type="button"
            className="flex justify-center item-center bg-blue-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => editarCliente()}
          >
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Editar
          </button>
        </td>
        <td className="border px-4 py-2">
          <button
            type="button"
            className="flex justify-center item-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => confirmarEliminarCliente()}
          >
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Eliminar
          </button>
        </td>
      </tr>
    </>
  )
}
 
export default Cliente;