<template>
  <div>
    <PreviaSelected />
    <br />

    <v-card style="padding: 20px; border: 1px">
      <v-card-title style="background-color: #78909c; color: #fff">
        <h4 style="color: #fff;">Itens Faturados</h4>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-white"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
          <span style="font-size: small; margin-right: 10px; color: #fff;">Total: {{ detalhes.length }}</span>
        <img src="../assets/csv.png" width="20" />
        <img src="../assets/excel.png" width="20" />
      </v-card-title>
      <v-data-table
        striped
        :loading="loading"
        :headers="headersItemConfig"
        :items="detalhes"
        :search="search"
        item-key="item_configuracao.nome"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        id="hover-color"
        dense
        disable-sort
      >
        <template v-slot:[`item.actions`]="{ item }">
          <router-link
            :to="{
              name: 'itemConfiguracao',
              params: { idPrevia: paramId, idItemConfig: item.id },
            }"
          >
            <b-icon
              id="icons-action"
              class="icon-btn"
              icon="eye"
              aria-hidden="true"
              variant="dark"
              @click="getDetail(item)"
            ></b-icon>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { api } from "@/service/api";
import { getPrevia, setItemConfig } from "@/service/localStorageService";
import PreviaSelected from "./tables/previaSelected.vue";

export default {
  name: "DetalhePrevia",
  data() {
    return {
      sortBy: 'item_configuracao.nome',
      sortDesc: false,
      paramId: this.$route.params.idPrevia,
      search: "",
      headersItemConfig: [
        {
          text: "Descrição",
          value: "item_configuracao.nome",
          order: "asc",
          align: "start",
          sortable: false,
        },
        {
          text: "Quantidade de Objetos do grupo de IC´s na infraestrutura",
          value: "qt_contabilizado",
        },
        { text: "Relevância (Vlr)", value: "nu_relevancia" },
        { text: "Relevância (%)", value: "vl_relevancia" },
        { text: "Diversidade (Vlr)", value: "nu_diversidade" },
        { text: "Diversidade (%)", value: "vl_diversidade" },
        {
          text: "Quantidade de US´s estimada para consumo unitário",
          value: "vl_item",
        },
        {
          text: "Quantidade de US´s estimada para consumo por Grupo de IC´S",
          value: "vl_grupo",
        },
        {
          text: "Valor mensal para a sustentação do item",
          value: "vl_total_faturado",
        },
        { text: "Ação", value: "actions" },
      ],
      detalhes: [],
      total: 0,
      loading: true,
      headerPrevia: [
        { nome: "Código", value: "id" },
        { nome: "Dia de Referência", value: "dt_mes_referencia" },
        { nome: "Regra de Faturamento", value: "bo_regra_cobranca" },
        { nome: "Qtd. IC´s contabilizado(s)", value: "qt_contabilizado" },
        { nome: "Vlr. Total em US´s", value: "vl_total_grupo" },
        { nome: "Valor Total Mensal", value: "vl_total_mensal" },
        { nome: "Dt. Processada", value: "dt_faturado" },
      ],
      previa: {},
    };
  },
  components: { PreviaSelected },
  methods: {
    getDetalhePrevias: function () {
      api.getPreviaById(this.paramId).then((res) => {
        const { data } = res || { data: [] };
        const result = data.data;
        // console.log(result);
        this.detalhes = result;
        this.total = data.total;
        this.loading = false;

        for (let i = 0; i < result.length; i++) {
          // Vl_grupo
          const vlrMensalGrupo =
            result[i]?.vl_item * result[i]?.qt_contabilizado;
          const vlrDivRel =
            vlrMensalGrupo +
            vlrMensalGrupo * result[i]?.vl_relevancia +
            vlrMensalGrupo * result[i]?.vl_diversidade;
          result[i].vl_grupo = vlrDivRel.toFixed(2);
        }
      });
    },

    getColorRegraFaturamento(isRegraFaturada) {
      // console.log('isRegra:',isRegraFaturada);
      if (isRegraFaturada) return "orange";
      else return "blue";
    },

    getColorDataReferencia(isDiario) {
      // console.log('boDiario:', isDiario);
      const result = !isDiario ? "purple" : "blue";
      return result;
    },

    getSelectedPrevia() {
      this.previa = getPrevia();
    },

    getDetail(item) {
      setItemConfig(item);
    },
  },
  mounted() {
    this.getDetalhePrevias();
    this.getSelectedPrevia();
  },
};
</script>

<style>
.table-header thead,
th, span {
  color: #fff !important;
  /* background-color: #455a64 !important; */
}

.back-button {
  color: blue;
  font-size: medium;
}
</style>
