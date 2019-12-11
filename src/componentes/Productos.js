import React, { useEffect } from "react";
import Producto from "./Producto";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../actions/productosActions";

const Productos = () => {
  //Ejecutar acción

  const dispatch = useDispatch();

  useEffect(() => {
    //Obtener productos
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, [dispatch]);

  //Acceder al State

  const loading = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error);
  const productos = useSelector(state => state.productos.productos);

  return (
    <>
      {error ? (
        <div className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </div>
      ) : null}
      <h2 className="text-center my-5">Listado de Productos</h2>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>
      {loading ? "Cargando..." : null}
    </>
  );
};

export default Productos;
