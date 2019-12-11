import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://my-json-server.typicode.com/jhonsnake/productos-server/"
});

export default clienteAxios;
