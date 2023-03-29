<template>
  <div style="font-weight: bold">
    <v-card>
      <v-card-title style="background-color: #78909c; color: #fff">
        Prévia: {{ desserts.length }}
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
        <v-btn color="success">Nova Prévia</v-btn>
      </v-card-title>

      <v-data-table
        class="elevation-1 table-header"
        :headers="headers"
        :items="desserts"
        :search="search"
        :loading="loading"
      >
        <template v-slot:[`item.bo_regra_cobranca`]="{ item }">
          <v-chip :color="getColorRegraFaturamento(item.bo_regra_cobranca)">
            {{ item.bo_regra_cobranca ? "Aplicada" : "Não Aplicada" }}
          </v-chip>
        </template>

        <template v-slot:[`item.dt_mes_referencia`]="{ item }">
          <v-chip :color="getColorDataReferencia(item.bo_diario)">
            <span class="dt_referencia">{{ item.dt_mes_referencia }}</span>
          </v-chip>
        </template>

        <template v-slot:[`item.vl_total_grupo`]="{ item }">
          <div> US {{ item.vl_total_grupo }} </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="{ name: 'detalhe', params: { idPrevia: item.id } }">
            <b-icon
              id="icons-action"
              class="icon-btn"
              icon="eye"
              aria-hidden="true"
              variant="dark"
              @click="getDetail(item)"
            ></b-icon>
          </router-link>

          <b-icon
            id="icons-action"
            class="icon-btn"
            icon="currency-dollar"
            aria-hidden="true"
            variant="dark"
            @click="tornarCandidata(item)"
          ></b-icon>

          <b-icon
            id="icons-action"
            class="icon-btn"
            icon="trash"
            aria-hidden="true"
            variant="dark"
            @click="deleteItem(item)"
          ></b-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { api } from "../service/api";
import { nomeMeses } from '../service/constantes';
import { formatarMoeda } from '../service/constantes';
import { setPrevia } from '../service/localStorageService';

export default {
  name: "PreviasComponent",

  data() {
    return {
      previas: [],
      search: "",
      headers: [
        {
          text: "Código",
          value: "id",
          align: "start",
          sortable: false,
        },
        { text: "Regra de Faturamento", value: "bo_regra_cobranca" },
        { text: "Dia/Mês de Referência", value: "dt_mes_referencia" },
        { text: "Qtd. IC´s contabilizado(s)", value: "qt_contabilizado" },
        { text: "Vlr. Total em US´s", value: "vl_total_grupo" },
        { text: "Valor Total Mensal", value: "vl_total_mensal" },
        { text: "Dt. Processada", value: "dt_faturado" },
        { text: "Ação", value: "actions" },
      ],
      desserts: [],
      loading: true,
    };
  },

  methods: {
    getPrevias: function () {
      api.listar().then((res) => {
        const { data } = res || { data: {} };
        const result = data.data;
        // console.log('resultado:',result);

        for (let i = 0; i < result.length; i++) {

          // Dia/Mes de Referência
            let datePart = result[i]?.dt_mes_referencia.match(/\d+/g),
            year = datePart[0].substring(2),
            month = datePart[1],
            day = datePart[2];
            result[i].dt_mes_referencia = day + "/" + month + "/" + `20${year}`;
        
            if (!result[i]?.bo_diario && result[i]?.dt_mes_referencia) {
              result[i].dt_mes_referencia = nomeMeses[+month - 1] + "/" + `20${year}`;
            }
         
            result[i].vl_total_grupo = formatarMoeda(result[i].vl_total_grupo);
            result[i].vl_total_mensal = `R$ ${formatarMoeda(result[i].vl_total_mensal)}`;
            
        }

        this.desserts = result;
        this.previas = result;
        this.loading = false;
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

    getDetail(item) {
      setPrevia(item);
    },

    tornarCandidata(item) {
      console.log("candidata:", item);
    },

    deleteItem(item) {
      console.log("delete: ", item);
    },
  },

  mounted() {
    this.getPrevias();
  },
};
</script>

<style>
#icons-action {
  cursor: pointer;
}

.theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) { background: yellow; } 

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}

.table-header thead,
th {
  color: #fff !important;
  background-color: #455a64 !important;
}

.table-body tbody {
  /* color: #fff !important; */
  background-color: #fff !important;
}

.text-white input,
label,
i,
input {
  border-color: white !important;
  color: white !important;
}

.dt_referencia {
  color: #fff;
}
</style>
