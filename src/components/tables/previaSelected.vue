<template>
  <div>
    <v-card>
      <v-card-title>
        <div>Prévia: {{ $route.params.idPrevia }}</div>
        <v-spacer></v-spacer>
        <a @click="$router.go(-1)">
          <div class="back-button">
            <b-icon
              id="icons-action"
              class="icon-btn"
              icon="chevron-double-left"
              aria-hidden="true"
              variant="primary"
            ></b-icon>
            Voltar
          </div>
        </a>
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead class="card-tittle-style">
            <tr>
              <th
                v-for="item in headerPrevia"
                :key="item.value"
                class="text-left"
              >
                {{ item.nome }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ previa.id }}</td>
              <td>
                <v-chip :color="getColorDataReferencia(previa.bo_diario)">
                  <div class="dt_referencia">{{
                    previa.dt_mes_referencia
                  }}</div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  :color="getColorRegraFaturamento(previa.bo_regra_cobranca)"
                >
                  {{ previa.bo_regra_cobranca ? "Aplicada" : "Não Aplicada" }}
                </v-chip>
              </td>
              <td>{{ previa.qt_contabilizado }}</td>
              <td>US {{ previa.vl_total_grupo }}</td>
              <td>{{ previa.vl_total_mensal }}</td>
              <td>{{ previa.dt_faturado }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { getPrevia } from "@/service/localStorageService";

export default {
  name: "DetalhePrevia",
  data() {
    return {
      paramId: this.$route.params.idPrevia,
      headerPrevia: [
        { nome: 'Código', value: 'id' },
        { nome: 'Dia de Referência', value: 'dt_mes_referencia' },
        { nome: 'Regra de Faturamento', value: 'bo_regra_cobranca' },
        { nome: 'Qtd. IC´s contabilizado(s)', value: 'qt_contabilizado' },
        { nome: 'Vlr. Total em US´s', value: 'vl_total_grupo' },
        { nome: 'Valor Total Mensal', value: 'vl_total_mensal' },
        { nome: 'Dt. Processada', value: 'dt_faturado' },
      ],
      previa: {},
    };
  },
  methods: {

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
  },
  mounted() {
    this.getSelectedPrevia();
  },
};
</script>
