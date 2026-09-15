import React, { useState, useEffect } from "react";
import FormBook from "../formulario/FormBook";
import FormCharter from "../formulario/FormCharter";
//import FormVerse from   '../formulario/FormVerse';
import SelectForm from "../formulario/SelectForm";
import Biblia from "../formulario/Bibli";
import Header from "./Header";
import EditCharter from "./EditCharter";
import FormVersion from "../formulario/FormVersion";
import FormVerseDia from "../formulario/VersiculoDia";
import VerseDiaManual from "../formulario/VerseDiaManual";
import Strongs from "./Strongs";
import "./Home.css";
import "./Vistas.css";

// Nombre visible de cada seccion (solo presentacion, no altera la logica)
const SECCIONES = {
  none: "Inicio",
  versionBiblia: "Versiones",
  verseDia: "Versiculo del dia",
  Strongs: "Strongs",
  Book: "Libros",
  EditCharter: "Editar capitulo",
  Charter: "Capitulos",
  Biblia: "Biblia",
};

/* Armazon visual del panel: barra superior, hero, tarjeta de
   contenido y pie. No recibe ni dispara ninguna accion. */
function Shell({ select, usuario, loginOut, children }) {
  return (
    <div className="pb-app">
      <div className="pb-topbar">
        <div className="pb-topbar__inner">
          <div className="pb-brand">
            <span className="pb-brand__mark">AV</span>
            <span className="pb-brand__text">
              <strong>API-BIBLIA-AV</strong>
              <small>Panel de administracion</small>
            </span>
          </div>
          <div className="pb-topbar__meta">
            <span className="pb-chip">
              <span className="pb-chip__dot" />
              {SECCIONES[select] || SECCIONES.none}
            </span>
            {usuario ? (
              <span className="pb-user" title={usuario}>
                <i className="bi bi-person-circle" />
                {usuario}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <Header LoginOut={loginOut} />

      <main className="pb-main container">
        <div className="pb-surface" key={select}>
          {children}
        </div>
      </main>

      <footer className="pb-footer">
        <span>Centro cristiano Aliento de vida</span>
        <span className="pb-footer__dot" />
        <span>Reina Valera 1960</span>
      </footer>
    </div>
  );
}

export default function Home(props) {
  const [select, setSelect] = useState("none");
  const [BookAll, setBookAll] = useState([]);
  const [versiones, setVersiones] = useState(null);

  const StrongsView = () => {
    setSelect("Strongs");
  };

  //const http = " http://localhost:3000";

  useEffect(() => {
    cargaBook();
    getversiones();
  }, []);

  const cargaBook = async () => {
    const data = await fetch(`${props.http}/books/books/${props.user.user}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token,
      },
    });
    const res = await data.json();
    setBookAll(res);
  };

  const getversiones = async () => {
    const data = await fetch(`${props.http}/books/versiones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token,
      },
    });
    const res = await data.json();
    setVersiones(res);
  };

  const versionBiblia = async () => {
    setSelect("versionBiblia");
  };

  const libro = async () => {
    setSelect("Book");
  };

  const capitulo = () => {
    setSelect("Charter");
  };

  const EditCharte = () => {
    setSelect("EditCharter");
  };

  const Bibliaapp = () => {
    setSelect("Biblia");
  };

  const VerseDia = () => {
    setSelect("verseDia");
  };

  // Dato mostrado en la barra superior (solo lectura)
  const usuario = props.user && (props.user.email || props.user.user);

  if (select === "versionBiblia")
    return (
      <Shell select={select} usuario={usuario} loginOut={props.LoginOut}>
        <SelectForm
          user={props.user}
          libro={libro}
          capitulo={capitulo}
          EditCharte={EditCharte}
          Bibliaapp={Bibliaapp}
          versionBiblia={versionBiblia}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
        <FormVersion http={props.http} user={props.user} />
      </Shell>
    );

  if (select === "verseDia")
    return (
      <Shell select={select} usuario={usuario} loginOut={props.LoginOut}>
        <SelectForm
          user={props.user}
          libro={libro}
          capitulo={capitulo}
          EditCharte={EditCharte}
          Bibliaapp={Bibliaapp}
          versionBiblia={versionBiblia}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
        <VerseDiaManual
          http={props.http}
          user={props.user}
          BookAll={BookAll}
        />
        <FormVerseDia http={props.http} user={props.user} />
      </Shell>
    );

  if (select === "Strongs")
    return (
      <Shell select={select} usuario={usuario} loginOut={props.LoginOut}>
        <SelectForm
          user={props.user}
          libro={libro}
          capitulo={capitulo}
          EditCharte={EditCharte}
          Bibliaapp={Bibliaapp}
          versionBiblia={versionBiblia}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
        <Strongs http={props.http} user={props.user} />
      </Shell>
    );

  if (select === "Book")
    return (
      <Shell select={select} usuario={usuario} loginOut={props.LoginOut}>
        <SelectForm
          user={props.user}
          libro={libro}
          capitulo={capitulo}
          EditCharte={EditCharte}
          Bibliaapp={Bibliaapp}
          versionBiblia={versionBiblia}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
        <FormBook
          http={props.http}
          BookAll={BookAll}
          cargaBook={cargaBook}
          user={props.user}
          versiones={versiones}
          getversiones={getversiones}
        />
      </Shell>
    );

  if (select === "EditCharter")
    return (
      <Shell select={select} usuario={usuario} loginOut={props.LoginOut}>
        <SelectForm
          user={props.user}
          libro={libro}
          capitulo={capitulo}
          EditCharte={EditCharte}
          Bibliaapp={Bibliaapp}
          versionBiblia={versionBiblia}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
        <EditCharter
          http={props.http}
          BookAll={BookAll}
          user={props.user}
          versiones={versiones}
        />
      </Shell>
    );

  if (select === "Charter")
    return (
      <Shell select={select} usuario={usuario} loginOut={props.LoginOut}>
        <SelectForm
          user={props.user}
          libro={libro}
          capitulo={capitulo}
          EditCharte={EditCharte}
          Bibliaapp={Bibliaapp}
          versionBiblia={versionBiblia}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
        <FormCharter
          BookAll={BookAll}
          user={props.user}
          http={props.http}
          versiones={versiones}
          getversiones={getversiones}
        />
      </Shell>
    );

  if (select === "none")
    return (
      <Shell select={select} usuario={usuario} loginOut={props.LoginOut}>
        <SelectForm
          user={props.user}
          libro={libro}
          capitulo={capitulo}
          EditCharte={EditCharte}
          Bibliaapp={Bibliaapp}
          versionBiblia={versionBiblia}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
      </Shell>
    );

  if (select === "Biblia")
    return (
      <Shell select={select} usuario={usuario} loginOut={props.LoginOut}>
        <SelectForm
          user={props.user}
          libro={libro}
          capitulo={capitulo}
          EditCharte={EditCharte}
          Bibliaapp={Bibliaapp}
          versionBiblia={versionBiblia}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
        <Biblia
          BookAll={BookAll}
          user={props.user}
          http={props.http}
          versiones={versiones}
          VerseDia={VerseDia}
          StrongsView={StrongsView}
        />
      </Shell>
    );
}
