import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  let navigate = useNavigate();
  const Swal = require("sweetalert2");
  const { store, actions } = useContext(Context);

  function login(email, password) {
    actions.login(email, password);
    console.log("usuario registrado");
    navigate("../privada", { replace: true });
  }

  return (
    <div className="container mt-5" style={{ width: "500px" }}>
      <h1 className="text-center">LOGIN</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          login(e.target[0].value, e.target[1].value);
        }}
        className="bg-light p-4 rounded"
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
          />
        </div>
        <div className="mb-3">
          <Link to={"/"}>¿no estas registrado?</Link>
        </div>

        <button type="submit" class="btn btn-secondary">
          Entrar
        </button>
      </form>
    </div>
  );
};
