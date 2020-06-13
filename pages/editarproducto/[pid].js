import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Input from '../../components/form/Input'
import { useQuery, useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { OBTENER_PRODUCTO, ACTUALIZAR_PRODUCTO } from '../../schemas'
import { Formik } from 'formik'
import Swal from 'sweetalert2'

const EditarProducto = () => {
  // Router
  const router = useRouter()
  const { query: { id = 1 } } = router
  // console.log(id)

  // Consultar para el producto
  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: { id }
  })

  // Actualizar Producto
  const [ actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO)

  // console.log(data)
  // console.log(loading)
  // console.log(error)

  if (loading) return 'cargando...'

  if (!data) return 'Accion no permitida'
  
  // console.log(data.obtenerProducto)
  const { obtenerProducto } = data
  
  // Schema de Validacion
  const validationSchema = Yup.object({
    nombre: Yup.string()
                .required('El nombre del producto es obligatorio'),
    existencia: Yup.number()
                .required('La cantidad de productos disponible es obligatoria')
                .integer('La cantidad debe ser un numero entero')
                .positive('La cantidad debe ser un numero positivo'),
    precio: Yup.number()
                .required('El precio del producto disponible es obligatorio')
                .positive('El precio debe ser un numero positivo')
  })

  const onHandleSubmit = async (values, functions) => {
    // console.log(values)
    // console.log(functions)
    const { nombre, existencia, precio} = values

    try {
      const { data } = await actualizarProducto({
        variables: {
          id,
          input: {
            nombre,
            existencia: parseInt(existencia),
            precio: parseInt(precio)
          }
        }
      })
      // console.log(data)

      // Sweet Alert
      Swal.fire(
        'Actualizado!',
        'El producto se actualizó correctamente',
        'success'
      )

      // Redireccionar a productos
      router.push('/productos')

    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Editar Producto</h1>
      {/* { mensaje && mostrarMensaje() } */}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={ validationSchema }
            enableReinitialize
            initialValues={ obtenerProducto }
            onSubmit={onHandleSubmit}
          >
            {props => {
              console.log(props)
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <Input 
                    text="Nombre"
                    id="nombre"
                    type="text"
                    placeholder="Nombre del Producto"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.nombre}
                    touched={props.touched.nombre}
                    errors={props.errors.nombre}
                  />
                  <Input 
                    text="Existencia"
                    id="existencia"
                    type="tel"
                    placeholder="existencia"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.existencia}
                    touched={props.touched.existencia}
                    errors={props.errors.existencia}
                  />
                  <Input 
                    text="Precio"
                    id="precio"
                    type="tel"
                    placeholder="200"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.precio}
                    touched={props.touched.precio}
                    errors={props.errors.precio}
                  />

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Actualizar Producto"
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
 
export default EditarProducto;