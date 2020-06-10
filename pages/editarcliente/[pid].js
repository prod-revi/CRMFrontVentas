import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Input from '../../components/form/Input'
import { useQuery, useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { OBTENER_CLIENTE, ACTUALIZAR_CLIENTE } from '../../schemas'
import { Formik } from 'formik'
import Swal from 'sweetalert2'

const EditarCliente = () => {
  // Router
  const router = useRouter()
  const { query: { id = 1 } } = router
  // console.log(id)

  // Consultar para obtener el cliente
  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: { id }
  })

  // Actualizar Cliente
  const [ actualizarCliente ] = useMutation(ACTUALIZAR_CLIENTE)

  // console.log(data)
  // console.log(loading)
  // console.log(error)

  // Schema de Validacion

  
  if (loading) return 'cargando...'

  // console.log(data.obtenerCliente)
  const { obtenerCliente } = data
  
  const validationSchema = Yup.object({
    nombre: Yup.string()
                .required('El nombre del cliente es obligatorio'),
    apellido: Yup.string()
                .required('El apellido del cliente es obligatorio'),
    empresa: Yup.string()
                .required('El campo empresa obligatorio'),
    email: Yup.string()
                .email('Email no valido')
                .required('El email del cliente es obligatorio')
  })

  const onHandleSubmit = async (values, functions) => {
    // console.log(values)
    // console.log(functions)
    const { nombre, apellido, empresa, email, telefono } = values

    try {
      const { data } = await actualizarCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono
          }
        }
      })
      // console.log(data)

      // Sweet Alert
      Swal.fire(
        'Actualizado!',
        'El cliente se actualizó correctamente',
        'success'
      )

      // Redireccionar al usuario
      router.push('/')

    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Editar Cliente</h1>
      {/* { mensaje && mostrarMensaje() } */}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={ validationSchema }
            enableReinitialize
            initialValues={ obtenerCliente }
            onSubmit={onHandleSubmit}
          >
            {props => {
              // console.log(props)

              return (

                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <Input 
                    text="Nombre"
                    id="nombre"
                    type="text"
                    placeholder="Nombre Cliente"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.nombre}
                    touched={props.touched.nombre}
                    errors={props.errors.nombre}
                  />
                  <Input 
                    text="Apellido"
                    id="apellido"
                    type="text"
                    placeholder="Apellido Cliente"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.apellido}
                    touched={props.touched.apellido}
                    errors={props.errors.apellido}
                  />
                  <Input 
                    text="Empresa"
                    id="empresa"
                    type="text"
                    placeholder="Empresa Cliente"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.empresa}
                    touched={props.touched.empresa}
                    errors={props.errors.empresa}
                  />
                  <Input 
                    text="Email"
                    id="email"
                    type="email"
                    placeholder="Email Cliente"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.email}
                    touched={props.touched.email}
                    errors={props.errors.email}
                  />
                  <Input 
                    text="Télefono"
                    id="telefono"
                    type="tel"
                    placeholder="Telefono Cliente"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.telefono}
                  />

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Editar Cliente"
                  />
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
      </Layout>
   );
}
 
export default EditarCliente;