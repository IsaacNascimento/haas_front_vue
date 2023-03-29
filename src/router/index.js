import Vue from "vue";
import Router from "vue-router";

import Previa from "../components/PreviasComponent.vue";
import DetalhePrevia from "../components/DetalhePrevia.vue";
import ItemConfiguracao from "../components/ItemConfiguracao.vue";

Vue.use(Router);

const routes = [
  {
    name: "previa",
    path: "/",
    component: Previa,
  },
  {
    name: "detalhe",
    path: "/detalhe/:idPrevia",
    component: DetalhePrevia,
  },
  {
    name: "itemConfiguracao",
    path: "previa/:idPrevia/item-configuracao/:idItemConfig",
    component: ItemConfiguracao,
  },
];

const router = new Router({ routes });

export default router;
