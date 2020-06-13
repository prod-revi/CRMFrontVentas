import React, { useState } from 'react';
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import { NUEVO_PRODUCTO, OBTENER_PRODUCTOS } from '../schemas'

const NuevoProducto = () => {
  // Router
  const router = useRouter()
  // Mensajes
  const [mensaje, guardarMensaje] = useState()

  // Mutation para crear un nuevo producto
  const [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })
      // Reescribir el cache ( nunca modificar el cache, reescribir)
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [ ...obtenerProductos, nuevoProducto ]
        }
      })

    }
  })

  // Formik
  const formik = useFormik({
    initialValues: {
      nombre: '',
      existencia: '',
      precio: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                  .required('El nombre del producto es obligatorio'),
      existencia: Yup.number()
                  .required('La cantidad de productos disponible es obligatoria')
                  .integer('La cantidad debe ser un numero entero')
                  .positive('La cantidad debe ser un numero positivo'),
      precio: Yup.number()
                  .required('El precio del producto disponible es obligatorio')
                  .positive('El precio debe ser un numero positivo')
    }),
    onSubmit: async values => {
      // console.log(values)
      const { nombre, existencia, precio } = values

      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              existencia: parseInt(existencia),
              precio: parseInt(precio)
            }
          }
        })
        // console.log(data.nuevoProducto)
        Swal.fire(
        'Producto creado!',
        'El Producto se a creado correctamente',
        'success'
      )
        router.push('/productos')
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
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>
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
              placeholder="Nombre del Producto"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.nombre}
              touched={formik.touched.nombre}
              errors={formik.errors.nombre}
            />
            <Input 
              text="Cantidad disponible"
              id="existencia"
              type="number"
              placeholder="existencia"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.existencia}
              touched={formik.touched.existencia}
              errors={formik.errors.existencia}
            />
            <Input 
              text="Precio"
              id="precio"
              type="number"
              placeholder="200"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.precio}
              touched={formik.touched.precio}
              errors={formik.errors.precio}
            />

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Registrar Producto"
            />
          </form>
        </div>
      </div>

    </Layout>
   );
}
 
export default NuevoProducto;