import React, { useState } from "react";

//React Router
import { useHistory } from "react-router-dom";

//Redux
import { crearNuevoProductoAction } from "../actions/productosActions";
import {
  validarFormularioAction,
  validacionExito,
  validacionError
} from "../actions/validacionActions";
import { useDispatch, useSelector } from "react-redux";

const NuevoProducto = () => {
  //Router

  let history = useHistory();

  // State
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState("");

  //Crear nuevo producto
  const dispatch = useDispatch();
  const agregarProducto = producto =>
    dispatch(crearNuevoProductoAction(producto));

  const validarFormulario = () => dispatch(validarFormularioAction());
  const exitoValidacion = () => dispatch(validacionExito());
  const errorValidacion = () => dispatch(validacionError());

  //Obtener los datos del State

  const error = useSelector(state => state.error.error);

  //Agregar nuevo producto
  const agregarNuevoProducto = e => {
    e.preventDefault();
    //Validar el formulario
    validarFormulario();
    // Si el nombre o el precio estan vacios
    if (nombre.trim() === "" || precio.trim() === "") {
      errorValidacion();
      return;
    }
    //Si pasa la validación
    exitoValidacion();
    //Agregar nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    //redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold ">
              Agregar Nuevo Libro
            </h2>
            <form onSubmit={agregarNuevoProducto}>
              <div className="form-group">
                <label>Nombre Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Libro"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Libro"
                  value={precio}
                  onChange={e => guardarPrecio(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {error ? (
              <div className="font-weight-bold alert alert-danger text-center mt-4">
                Todos los campos son obligatorios
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
