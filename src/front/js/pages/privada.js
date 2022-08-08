import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Privada = () => {
  let navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const nombre = sessionStorage.getItem("nombre");

  const [imprimir, setImprimir] = useState(false);
  console.log(store.permiso);
  console.log(nombre);
  function logout() {
    actions.logout();
    navigate("../login", { replace: true });
  }

  useEffect(() => {
    setTimeout(() => {
      actions.privado();
    }, 500);
  }, []);

  setTimeout(() => {
    setImprimir(true);
  }, 1000);

  return imprimir ? (
    <div className="container mt-5 d-flex" style={{ width: "900px" }}>
      <h1 className="text-center">
        {store.permiso
          ? nombre + " bienvenid@ a tu pagina privada"
          : "la pagina no existe"}
      </h1>
      <button className="btn btn-danger ms-5" onClick={() => logout()}>
        Cerrar Sesion
      </button>
    </div>
  ) : (
    <div className="container d-flex justify-content-center mt-5 pt-5">
      <div className="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};
