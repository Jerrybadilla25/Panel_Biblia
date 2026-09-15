import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Strongs(props) {
  const [lote, setLote] = useState(1);
  const [entradas, setEntradas] = useState([]);
  const [totalLotes, setTotalLotes] = useState(1);
  const [totalTraducidas, setTotalTraducidas] = useState(0);
  const [total, setTotal] = useState(0);
  const [pegado, setPegado] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    // Se recarga solo al cambiar de lote: no se agrega cargarLote
    // a las dependencias para no recargar en cada render.
    cargarLote(lote);
  }, [lote]);

  const cargarLote = async (numero) => {
    setCargando(true);
    try {
      const data = await fetch(`${props.http}/strongs/lote/${numero}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": props.user.token,
        },
      });
      const res = await data.json();
      setEntradas(res.entradas || []);
      setTotalLotes(res.totalLotes || 1);
      setTotalTraducidas(res.totalTraducidas || 0);
      setTotal(res.total || 0);
    } catch (error) {
      toast.error("Error al cargar el lote");
    }
    setCargando(false);
  };

  // Arma el JSON liviano (solo lo necesario para traducir) y lo copia al portapapeles
  const copiarLoteParaTraducir = () => {
    const paraTraducir = entradas
      .filter((e) => !e.translated)
      .map((e) => ({
        strong: e.strong,
        lemma: e.lemma,
        strongs_def: e.strongs_def,
      }));

    const texto = JSON.stringify(paraTraducir, null, 2);
    navigator.clipboard.writeText(texto);
    toast.success(`Copiadas ${paraTraducir.length} entradas al portapapeles`);
  };

  // Toma lo que el usuario pega (el JSON que Claude devuelve con strongs_def_es)
  // y lo aplica localmente a la tabla, antes de guardar
  const aplicarPegado = () => {
    try {
      const traducciones = JSON.parse(pegado);
      const mapa = {};
      traducciones.forEach((t) => {
        mapa[t.strong] = t.strongs_def_es;
      });

      const actualizadas = entradas.map((e) =>
        mapa[e.strong] ? { ...e, strongs_def_es: mapa[e.strong] } : e,
      );

      setEntradas(actualizadas);
      toast.success(
        `Aplicadas ${Object.keys(mapa).length} traducciones. Revisá y guardá.`,
      );
      setPegado("");
    } catch (error) {
      toast.error("El JSON pegado no es válido");
    }
  };

  const editarTraduccion = (strong, valor) => {
    setEntradas(
      entradas.map((e) =>
        e.strong === strong ? { ...e, strongs_def_es: valor } : e,
      ),
    );
  };

  const guardarLote = async () => {
    const paraGuardar = entradas
      .filter((e) => e.strongs_def_es)
      .map((e) => ({ strong: e.strong, strongs_def_es: e.strongs_def_es }));

    if (paraGuardar.length === 0) {
      toast.error("No hay traducciones para guardar");
      return;
    }

    try {
      const data = await fetch(`${props.http}/strongs/guardar-traducciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": props.user.token,
        },
        body: JSON.stringify(paraGuardar),
      });
      const res = await data.json();
      toast.success(`Guardadas ${res.modificados} traducciones`);
      cargarLote(lote);
    } catch (error) {
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="mt-4">
      <h2>Traducción de diccionario Strong</h2>
      <div className="pb-stats">
        <span className="pb-stat">
          Total: <strong>{total}</strong>
        </span>
        <span className="pb-stat">
          Traducidas: <strong>{totalTraducidas}</strong>
        </span>
        <span className="pb-stat">
          Lote <strong>{lote}</strong> de <strong>{totalLotes}</strong>
        </span>
      </div>

      <div className="pb-toolbar">
        <button
          className="pb-btn"
          onClick={() => setLote(Math.max(1, lote - 1))}
          disabled={lote <= 1}
        >
          ← Lote anterior
        </button>
        <button
          className="pb-btn"
          onClick={() => setLote(Math.min(totalLotes, lote + 1))}
          disabled={lote >= totalLotes}
        >
          Lote siguiente →
        </button>
        <button className="pb-btn pb-btn--soft" onClick={copiarLoteParaTraducir}>
          📋 Copiar lote para traducir
        </button>
      </div>

      <div className="pb-card mb-4">
        <h4 className="pb-section-title">Traducciones pegadas</h4>
        <textarea
          className="form-control"
          placeholder="Pegá acá el JSON traducido que te devuelve Claude..."
          value={pegado}
          onChange={(e) => setPegado(e.target.value)}
          rows={6}
        />
        <div className="pb-toolbar">
          <button className="pb-btn pb-btn--soft" onClick={aplicarPegado}>
            Aplicar traducciones pegadas
          </button>
          <button className="pb-btn pb-btn--primary" onClick={guardarLote}>
            💾 Guardar traducciones de este lote
          </button>
        </div>
      </div>

      {cargando ? (
        <p className="pb-msj">Cargando...</p>
      ) : (
        <div className="pb-table-wrap">
          <table className="pb-table">
            <thead>
              <tr>
                <th>Strong</th>
                <th>Lema</th>
                <th>Definición (inglés)</th>
                <th>Traducción (español)</th>
              </tr>
            </thead>
            <tbody>
              {entradas.map((e) => (
                <tr key={e.strong}>
                  <td className="pb-strong">{e.strong}</td>
                  <td>{e.lemma}</td>
                  <td>{e.strongs_def}</td>
                  <td>
                    <textarea
                      className="form-control"
                      value={e.strongs_def_es || ""}
                      onChange={(ev) =>
                        editarTraduccion(e.strong, ev.target.value)
                      }
                      rows={2}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
