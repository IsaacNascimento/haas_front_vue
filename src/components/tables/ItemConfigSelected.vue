<template>
    <div>
        <v-card>
      <v-card-title>
        <div>Item de Configuração #{{ itemConfig?.item_configuracao?.nome }}</div>
        <v-spacer></v-spacer>
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
                {{ item.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ itemConfig?.item_configuracao?.nome }}</td>
              <td>{{ itemConfig.qt_contabilizado }}</td>
              <td>{{ itemConfig.nu_relevancia }}</td>
              <td>{{ itemConfig.vl_relevancia }}</td>
              <td>{{ itemConfig.nu_diversidade }}</td>
              <td>{{ itemConfig.vl_diversidade }}</td>
              <td>US {{ itemConfig.vl_item }}</td>
              <td>US {{ itemConfig.vl_grupo }}</td>
              <td>R$ {{ itemConfig.vl_total_faturado }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card> 
    </div>
</template>

<script>
import { getItemConfig } from "@/service/localStorageService";

export default {
  name: "ItemConfigSelected",
  data() {
    return {
      paramId: this.$route.params.id,
      headerPrevia: [
        { text: 'Descrição', value: 'nome' },
        { text: 'Quantidade de Objetos do grupo de IC´s na infraestrutura', value: 'qt_contabilizado' },
        { text: "Relevância (Vlr)", value: "nu_relevancia" },
        { text: "Relevância (%)", value: "vl_relevancia" },
        { text: "Diversidade (Vlr)", value: "nu_diversidade" },
        { text: "Diversidade (%)", value: "vl_diversidade" },
        { text: "Quantidade de US´s estimada para consumo unitário", value: "vl_item" },
        { text: "Quantidade de US´s estimada para consumo por Grupo de IC´S", value: "vl_grupo" },
        { text: "Valor mensal para a sustentação do item", value: "vl_total_faturado" },
      ],
      itemConfig: {},
    };
  },
  methods: {
    getSelectedPrevia() {
      this.itemConfig = getItemConfig();
    },
  },
  mounted() {
    this.getSelectedPrevia();
  },
};
</script>