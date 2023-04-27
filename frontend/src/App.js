import './styles/App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pdv from './components/Pdv';
import Produtos from './components/Produtos';
import Relatorio from './components/Relatorios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pdv/>
  },
  {
    path: "/produtos",
    element: <Produtos/>,
  },
  {
    path: "/relatorios",
    element: <Relatorio/>,
  },
]);
 
function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    )
}


export default App;
