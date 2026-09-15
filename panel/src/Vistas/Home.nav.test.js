import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";

// Test de regresion: la navegacion entre secciones tiene que funcionar
// desde cualquier seccion (antes, al entrar a Strongs el SelectForm se
// renderizaba solo con StrongsView y los demas botones no hacian nada).
const user = { user: "admin", token: "token", email: "admin@bibliaav.com" };

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const u = String(url);
    if (u.includes("/books/versiones")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([{ _id: "v1", versionBible: "Reina_Valera_1960" }]),
      });
    }
    if (u.includes("/strongs/lote/")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            entradas: [],
            totalLotes: 1,
            totalTraducidas: 0,
            total: 0,
          }),
      });
    }
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });
});

const SECCIONES = [
  {
    boton: "Version",
    visible: async () => screen.findByText(/Nueva version/i),
  },
  { boton: "Book", visible: async () => screen.findByText(/Nuevo libro/i) },
  {
    boton: "Charter",
    visible: async () => screen.findByText(/Nuevo capitulo/i),
  },
  {
    boton: "Edit Charter",
    visible: async () => {
      await screen.findByText(/Seleccione una version/i);
      expect(document.querySelectorAll(".pb-panel").length).toBeGreaterThan(1);
    },
  },
  {
    boton: "Biblia",
    visible: async () => {
      const chip = await screen.findByRole("button", {
        name: "Reina_Valera_1960",
      });
      fireEvent.click(chip);
      await screen.findByText("indice");
    },
  },
  {
    boton: "Versiculo dia",
    visible: async () => screen.findByText(/Cargar versiculo manual/i),
  },
  {
    boton: "Strongs",
    visible: async () => screen.findByText(/Traducción de diccionario Strong/i),
  },
];

const irA = async (seccion) => {
  fireEvent.click(screen.getByRole("button", { name: seccion.boton }));
  await seccion.visible();
};

test("desde cualquier seccion se puede ir a todas las demas", async () => {
  render(<Home http="http://api.local" user={user} LoginOut={() => {}} />);
  await screen.findByRole("button", { name: "Strongs" });

  for (const origen of SECCIONES) {
    await irA(origen);

    for (const destino of SECCIONES) {
      await irA(destino);
      await waitFor(() => expect(screen.getByRole("button", { name: origen.boton })).toBeEnabled());
    }
  }
});
