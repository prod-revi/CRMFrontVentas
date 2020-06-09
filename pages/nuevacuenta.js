import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'

import { NUEVA_CUENTA } from '../schemas'

const NuevaCuenta = () => {

  // State para el mensaje
  const [ mensaje, guardarMensaje ] = useState()
  
  // Mutation: Create User
  const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA)

  // Routing
  const router = useRouter()

  // Form Validation
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                  .required('El Nombre es obligatorio'),
      apellido: Yup.string()
                  .required('El Apellido es obligatorio'),
      email: Yup.string()
                  .email('El email no es valido')
                  .required('El email es obligatorio'),
      password: Yup.string()
                  .required('El password es obligatorio')
                  .min(6, 'El password debe ser de al menos 6 caracteres.'),
    }),
    onSubmit: async values => {
      // console.log('enviado')
      // console.log(values)

      const { nombre, apellido, email, password } = values

      try {
        const {data} = await nuevoUsuario({
          variables : {
            input : {
              nombre, apellido, email, password
            }
          }
        })

        // console.log(data)

        // Usuario Creado correctamente
        guardarMensaje(`Se creo correctamente el Usuario: ${data.nuevoUsuario.nombre}`)

        setTimeout(() => {
          guardarMensaje(null)
          // Redirigir al usuario para iniciar sesion
          router.push('/login')
        }, 5000)



      } catch (error) {
        guardarMensaje(error.message.replace('GraphQL error: ', ''));
        // console.log(error.message)
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
      { mensaje && mostrarMensaje() }
      <h1 className="text-center text-2xl text-white font-light">Crear nueva cuenta</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <Input 
              text="Nombre"
              id="nombre"
              type="text"
              placeholder="Nombre del usuario"
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
              placeholder="Apellido del usuario"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.apellido}
              touched={formik.touched.apellido}
              errors={formik.errors.apellido}
            />
            <Input 
              text="Email"
              id="email"
              type="text"
              placeholder="email del usuario"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.email}
              touched={formik.touched.email}
              errors={formik.errors.email}
            />
            <Input 
              text="Password"
              id="password"
              type="password"
              placeholder="Password del usuario"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.password}
              touched={formik.touched.password}
              errors={formik.errors.password}
            />

            <input type="submit" 
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
              value="Crear cuenta"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
 
export default NuevaCuenta