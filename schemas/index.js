import { gql } from '@apollo/client'

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input){
      token
    }
  }
`

const OBETNER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
    }
  }
`


const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`

export {
  AUTENTICAR_USUARIO,
  OBETNER_USUARIO,
  NUEVO_CLIENTE,
  NUEVA_CUENTA,
  OBTENER_CLIENTES_USUARIO,
  ELIMINAR_CLIENTE
}