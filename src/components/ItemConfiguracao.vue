<template>
  <div>
    <PreviaSelected />
    <br />
    <ItemConfigSelected />
    <br />
    <v-card>
      <v-toolbar style="background-color: #78909c">
        <v-tabs center-active  dark>
          <v-toolbar-items v-for="item in headerAba" :key="item.value">
            <v-tab
              @click="getAbaHeader(item.value)"
              :color="getColor(item.value)"
              align-with-title
            >
              <span style="color: #fff; font-weight: bold"
                >{{ item.text }}
              </span>
            </v-tab>
          </v-toolbar-items>
        </v-tabs>
      </v-toolbar>

      <v-card style="padding: 20px; border: 1px">
        <v-card-title style="background-color: #78909c; color: #fff">
          Total: {{ itemsConfig.length }}
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

          <img src="../assets/csv.png" width="20" />
          <img src="../assets/excel.png" width="20" />
        </v-card-title>

        <v-data-table
          class="elevation-0 table-header"
          :headers="headers"
          :items="itemsConfig"
          :search="search"
          :loading="loading"
        >
        </v-data-table>
      </v-card>
      <br />
    </v-card>
  </div>
</template>

<script>
import PreviaSelected from "./tables/previaSelected.vue";
import ItemConfigSelected from "./tables/ItemConfigSelected.vue";
import { api } from "@/service/api";

export default {
  name: "ItemConfiguracao",
  data() {
    return {
      search: "",
      idItemConfig: this.$route.params.idItemConfig,
      itemsConfig: [],
      total: 0,
      headers: [],
      loading: true,
      headerAba: [
        { text: "CONTABILIZADO", value: "contabilizado" },
        { text: "NÃO CONTABILIZADO", value: "nao_contabilizado" },
        { text: "CONDICIONAL", value: "condicional" },
        { text: "DIVERSIDADE", value: "diversidade" },
      ],
      currentAbaHeader: "contabilizado",
    };
  },
  components: { PreviaSelected, ItemConfigSelected },
  methods: {
    getItemConfigDetalhe: function () {
      const itemAbaHeader = this.currentAbaHeader;

      api.getItemConfigDetalhe(this.idItemConfig).then((res) => {
        const { data } = res || { data: [] };

        const defaultValue = data?.contabilizado;
        const result = itemAbaHeader
          ? data[`${itemAbaHeader}`]
          : defaultValue;

        this.itemsConfig = result;
        this.total =
          data[`total_${itemAbaHeader}`] || data?.total_contabilizado;

        // Headers
        const itemsHeaders = Object.keys(result[0] || []);
        const headers = [];
        for (let i = 0; i < itemsHeaders.length; i++) {
          const headerID = {
            text: itemsHeaders[i],
            value: itemsHeaders[i],
            align: "start",
            sortable: false,
          };
          const normalHeader = {
            text: itemsHeaders[i],
            value: itemsHeaders[i],
          };
          headers.push(
            itemsHeaders[i] === itemsHeaders[0] ? headerID : normalHeader
          );
        }

        this.headers = headers;
        this.loading = false;
      });
    },
    getAbaHeader(itemAbaHeader) {
      this.currentAbaHeader = itemAbaHeader;
    },
    getColor(item) {
      if (item === this.currentAbaHeader) {
        return "green";
      }
    },
  },
  watch: {
    currentAbaHeader: function () {
      // console.log('watch:',this.currentAbaHeader);
      this.getItemConfigDetalhe();
    },
  },
  mounted() {
    this.getItemConfigDetalhe();
  },
};
</script>

<style></style>
