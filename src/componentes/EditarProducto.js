import React, { useEffect, useRef } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerProductoEditarAction,
  EditarProductoAction
} from "../actions/productosActions";
import {
  validarFormularioAction,
  validacionExito,
  validacionError
} from "../actions/validacionActions";

import Swal from "sweetalert2";

export default function EditarProducto() {
  //Crear los ref
  const nombreRef = useRef("");
  const precioRef = useRef("");

  //Dispatch accion principal
  const dispatch = useDispatch();

  const validarFormulario = () => dispatch(validarFormularioAction());
  const exitoValidacion = () => dispatch(validacionExito());
  const errorValidacion = () => dispatch(validacionError());

  const editarProducto = producto => dispatch(EditarProductoAction(producto));

  const match = useRouteMatch();
  const history = useHistory();
  const { id } = match.params;
  useEffect(() => {
    dispatch(obtenerProductoEditarAction(id));
  }, [dispatch, id]);

  // Acceder al State

  const producto = useSelector(state => state.productos.producto);
  const error = useSelector(state => state.productos.error);

  if (!producto) return "Cargando...";

  const submitEditarProducto = e => {
    e.preventDefault();

    //Validar el formulario
    validarFormulario();
    if (
      nombreRef.current.value.trim() === "" ||
      precioRef.current.value.trim() === ""
    ) {
      errorValidacion();
      return;
    }
    // No hay error

    exitoValidacion();
    //Guardar los cambios
    editarProducto({
      id: id,
      nombre: nombreRef.current.value,
      precio: precioRef.current.value
    });

    Swal.fire(
      "Almacenado",
      "El producto se actualizó correctamente",
      "success"
    );

    //Redireccionar
    history.push("/");
  };

  return error ? (
    <div className="font-weight-bold alert alert-danger text-center mt-4">
      Hubo un error intenta de nuevo.
    </div>
  ) : (
    <>
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Editar Producto</h2>
              <form onSubmit={submitEditarProducto}>
                <div className="form-group">
                  <label>Titulo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Titulo"
                    defaultValue={producto.nombre}
                    ref={nombreRef}
                  />
                </div>
                <div className="form-group">
                  <label>Precio del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Precio"
                    defaultValue={producto.precio}
                    ref={precioRef}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
