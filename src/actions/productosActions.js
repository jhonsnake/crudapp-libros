import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITOSA,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types/types";

import clienteAxios from "../config/axios";

// Crear un nuevo producto - Función Principal

export function crearNuevoProductoAction(producto) {
  return dispatch => {
    dispatch(nuevoProducto());

    //Insertar en la API
    clienteAxios
      .post("/libros", producto)
      .then(respuesta => {
        console.log(respuesta);
        //se ejecuta si se inserta correctamente
        dispatch(nuevoProductoExito(producto));
      })
      .catch(error => {
        console.log(error);
        dispatch(nuevoProductoError(error));
      });
  };
}

export const nuevoProducto = () => ({ type: AGREGAR_PRODUCTO });
export const nuevoProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});
export const nuevoProductoError = error => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: error
});

//Obtener listado de productos, consultar API

export function obtenerProductosAction() {
  return dispatch => {
    //Comenzar la carga
    dispatch(obtenerProductoComienzo());
    //Consultar la api

    clienteAxios
      .get("/libros")
      .then(respuesta => {
        const { data } = respuesta;
        dispatch(descargaProductosExitosa(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(descargaProductosError(error));
      });
  };
}

export const obtenerProductoComienzo = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS
});

export const descargaProductosExitosa = respuesta => ({
  type: DESCARGA_PRODUCTOS_EXITOSA,
  payload: respuesta
});

export const descargaProductosError = error => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  error: error
});

// Función que elimina un producto en específico.

export function borradProductoAction(id) {
  return dispatch => {
    dispatch(obtenerProductoEliminar());

    // Eliminar en la API

    clienteAxios
      .delete(`/libros/${id}`)
      .then(respuesta => {
        //console.log(respuesta);
        dispatch(eliminarProductoExito(id));
      })
      .catch(error => {
        //console.log(error);
        dispatch(eliminarProductoError());
      });
  };
}

export const obtenerProductoEliminar = () => ({
  type: OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
  type: PRODUCTO_ELIMINADO_EXITO,
  payload: id
});

export const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR
});

// Obtener el producto a editar

export function obtenerProductoEditarAction(id) {
  return dispatch => {
    dispatch(obtenerProductoAction());
    // Obtener producto de la API

    clienteAxios
      .get(`/libros/${id}`)
      .then(respuesta => {
        //console.log(respuesta.data);
        dispatch(obtenerProductoEditarExito(respuesta.data));
      })
      .catch(error => {
        //console.log(error);
        dispatch(obtenerProductoEditarError());
      });
  };
}

export const obtenerProductoAction = () => ({
  type: OBTENER_PRODUCTO_EDITAR
});

export const obtenerProductoEditarExito = producto => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto
});

export const obtenerProductoEditarError = () => ({
  type: PRODUCTO_EDITAR_ERROR
});

// Modifica un producto en la api y state

export function EditarProductoAction(producto) {
  return dispatch => {
    dispatch(comenzarEdicionProducto());
    // Consultar la API
    clienteAxios
      .put(`/libros/${producto.id}`, producto)
      .then(respuesta => {
        //console.log(respuesta);
        dispatch(editarProductoExito(respuesta.data));
      })
      .catch(error => {
        // console.log(error);
        dispatch(editarProductoError());
      });
  };
}

export const comenzarEdicionProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});

export const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});

export const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR
});
