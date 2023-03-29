import { http } from "./config";

const api = {
  test: () => {
    return http.get("/api");
  },
  listar: () => {
    return http.get("/api/previas");
  },
  getPreviaById: (id) => {
    return http.get(`/api/previa-detalhe/${id}`);
  },
  getItemConfigDetalhe: (faturamento_itemId) => {
    return http.get(
      `/api/previa-detalhe/inventario/item-configuracao/${faturamento_itemId}`
    );
  },
};

export { api };
