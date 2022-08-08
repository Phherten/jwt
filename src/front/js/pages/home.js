import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

export const Registro = () => {
  let navigate = useNavigate();
  const Swal = require("sweetalert2");
  const { store, actions } = useContext(Context);
  let usuario = store.usuario;

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function registro(nombre, email, password) {
    if (usuario == "usuario ya existe") {
      Swal.fire({
        title: "El usuario ya existe",

        icon: "error",
        confirmButtonText: "Cool",
      });
      navigate("../login", { replace: true });
    } else if (password1 == password2) {
      actions.registro(nombre, email, password);
      Swal.fire({
        title: "Usuario registrado correctamente",
        icon: "success",
        confirmButtonText: "Cool",
      });
      navigate("../login", { replace: true });
    } else {
      Swal.fire({
        title: "La constraseña no coincide",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }

  return (
    <div className="container mt-5" style={{ width: "500px" }}>
      <h1 className="text-center">REGISTRO</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          registro(e.target[0].value, e.target[1].value, e.target[2].value);
        }}
        className="bg-light p-4 rounded"
      >
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" id="exampleInputName" />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => actions.existe(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Contraseña
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword2" class="form-label">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword2"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <Link to={"/login"}>¿ya estas registrado?</Link>
        </div>

        <button type="submit" class="btn btn-secondary">
          Registrar
        </button>
      </form>
    </div>
  );
};
