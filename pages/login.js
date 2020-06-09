import React, { useState } from 'react'
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { AUTENTICAR_USUARIO } from '../schemas'

const Login = () => {

  // Routing
  const router = useRouter()

  // Mensajes
  const [mensaje, guardarMensaje] = useState()

  // Mutation para crear nuevos usuarios en apollo
  const [autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
                .email('El email no es válido')
                .required('El email no puede ir vacio'),
      password: Yup.string()
                .required('El password es obligatorio')
    }),
    onSubmit: async values => {
      // console.log(values)
      const { email, password } = values;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password
            }
          }
        })

        // console.log(data)
        guardarMensaje('Autenticando...')

        // Guardar el token en localStorege
        const { token } = data.autenticarUsuario
        localStorage.setItem('token', token)

        // Redireccion hacia clientes
        setTimeout( () => {
          guardarMensaje(null)
          router.push('/')
        }, 2000)

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
      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      { mensaje && mostrarMensaje() }
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <Input 
              text="Email"
              id="email"
              type="email"
              placeholder="Email"
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
              placeholder="**********"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.password}
              touched={formik.touched.password}
              errors={formik.errors.password}
            />

            <input type="submit" 
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
              value="Iniciar Sesión"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
 
export default Login