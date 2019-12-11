import React from "react";
//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// Componentes

import Header from "./componentes/Header";
import Productos from "./componentes/Productos";
import NuevoProducto from "./componentes/NuevoProducto";
import EditarProducto from "./componentes/EditarProducto";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Productos />
            </Route>
            <Route path="/productos/nuevo">
              <NuevoProducto />
            </Route>
            <Route path="/productos/editar/:id">
              <EditarProducto />
            </Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
