import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
    <div className="container">
      <h1>
        <Link to="/" className="text-light ">
          CRUD - React, Redux Hooks, REST Api y axios
        </Link>
      </h1>

      <Link
        to="/productos/nuevo"
        className="btn btn-danger nuevo-post d-block d-md-inline-block"
      >
        Agregar Producto &#43;
      </Link>
    </div>
  </nav>
);

export default Header;
