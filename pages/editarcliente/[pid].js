import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Input from '../../components/form/Input'

const EditarCliente = () => {
  // Router
  const router = useRouter()
  const { query: { id } } = router
  console.log(id)

  return ( 
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Editar Cliente</h1>
      {/* { mensaje && mostrarMensaje() } */}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            // onSubmit={formik.handleSubmit}
          >
            <Input 
              text="Nombre"
              id="nombre"
              type="text"
              placeholder="Nombre Cliente"
              // handleChange={formik.handleChange}
              // handleBlur={formik.handleBlur}
              // value={formik.nombre}
              // touched={formik.touched.nombre}
              // errors={formik.errors.nombre}
            />
            <Input 
              text="Apellido"
              id="apellido"
              type="text"
              placeholder="Apellido Cliente"
              // handleChange={formik.handleChange}
              // handleBlur={formik.handleBlur}
              // value={formik.apellido}
              // touched={formik.touched.apellido}
              // errors={formik.errors.apellido}
            />
            <Input 
              text="Empresa"
              id="empresa"
              type="text"
              placeholder="Empresa Cliente"
              // handleChange={formik.handleChange}
              // handleBlur={formik.handleBlur}
              // value={formik.empresa}
              // touched={formik.touched.empresa}
              // errors={formik.errors.empresa}
            />
            <Input 
              text="Email"
              id="email"
              type="email"
              placeholder="Email Cliente"
              // handleChange={formik.handleChange}
              // handleBlur={formik.handleBlur}
              // value={formik.email}
              // touched={formik.touched.email}
              // errors={formik.errors.email}
            />
            <Input 
              text="Télefono"
              id="telefono"
              type="tel"
              placeholder="Telefono Cliente"
              // handleChange={formik.handleChange}
              // handleBlur={formik.handleBlur}
              // value={formik.telefono}
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
 
export default EditarCliente;