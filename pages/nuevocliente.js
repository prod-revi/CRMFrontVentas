import React, { useState } from 'react';
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { NUEVO_CLIENTE, OBTENER_CLIENTES_USUARIO } from '../schemas'

const NuevoCliente = () => {

  // Router
  const router = useRouter()

  // Mensajes
  const [mensaje, guardarMensaje] = useState()

  // Mutation para crear nuevos clientes
  const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO })
      
      // Reescribir el cache ( nunca modificar el cache, reescribir)
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: [ ...obtenerClientesVendedor, nuevoCliente ]
        }
      })

    }
  })

  // Formik
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                  .required('El nombre del cliente es obligatorio'),
      apellido: Yup.string()
                  .required('El apellido del cliente es obligatorio'),
      empresa: Yup.string()
                  .required('El campo empresa obligatorio'),
      email: Yup.string()
                  .email('Email no valido')
                  .required('El email del cliente es obligatorio')
    }),
    onSubmit: async values => {
      // console.log(values)

      const { nombre, apellido, empresa, email, telefono } = values


      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono
            }
          }
        })

        // console.log(data.nuevoCliente)
        router.push('/')

      } catch (error) {
        // console.log(error)
        guardarMensaje(error.message.replace('GraphQL error: ', ''))
        setTimeout( () => {
          guardarMensaje(null)
        }, 3000)
      }
    }
  })

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    )
  }

  return ( 
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
      { mensaje && mostrarMensaje() }

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <Input 
              text="Nombre"
              id="nombre"
              type="text"
              placeholder="Nombre Cliente"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.nombre}
              touched={formik.touched.nombre}
              errors={formik.errors.nombre}
            />
            <Input 
              text="Apellido"
              id="apellido"
              type="text"
              placeholder="Apellido Cliente"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.apellido}
              touched={formik.touched.apellido}
              errors={formik.errors.apellido}
            />
            <Input 
              text="Empresa"
              id="empresa"
              type="text"
              placeholder="Empresa Cliente"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.empresa}
              touched={formik.touched.empresa}
              errors={formik.errors.empresa}
            />
            <Input 
              text="Email"
              id="email"
              type="email"
              placeholder="Email Cliente"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.email}
              touched={formik.touched.email}
              errors={formik.errors.email}
            />
            <Input 
              text="Télefono"
              id="telefono"
              type="tel"
              placeholder="Telefono Cliente"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.telefono}
            />

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Registrar Cliente"
            />
          </form>
        </div>
      </div>

    </Layout>
   );
}
 
export default NuevoCliente;