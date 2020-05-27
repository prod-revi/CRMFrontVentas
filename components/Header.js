import React from 'react';
import { gql, useQuery } from '@apollo/client'

const OBETNER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`

const Header = () => {

  // Query Apollo
  const { data, loading, error} = useQuery(OBETNER_USUARIO)

  console.log(data)
  console.log(loading)
  console.log(error)

  // Proteger que no accedamos a data antes de tener resultados

  if (loading) return null

  const { nombre, apellido } = data.obtenerUsuario

  return ( 
    <div className="flex justify-between mb-6">
      <p className="mr-2">Hola: {nombre} {apellido}</p>

      <button type="button">Cerrar Sesión</button>
    </div>
  );
}
 
export default Header;