import React from "react";
import { Link } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { borradProductoAction } from "../actions/productosActions";
import Swal from "sweetalert2";

export default function Producto({ producto }) {
  //Dispatch para ejecutar las acciones
  const dispatch = useDispatch();

  const confirmarEliminarPeoducto = id => {
    // Confirmación de sweet alert
    //Preguntar al usuario
    Swal.fire({
      title: "¿Está seguro?",
      text: "Un producto eliminado no se pueede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        Swal.fire(
          "Eliminado",
          "El producto ha sido eliminado correctamente",
          "success"
        );
        dispatch(borradProductoAction(id));
      }
    });
  };

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>
        <span className="font-weight-bold">${producto.precio}</span>
      </td>
      <td className=" acciones">
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-primary mr-2"
        >
          Editar
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => confirmarEliminarPeoducto(producto.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
