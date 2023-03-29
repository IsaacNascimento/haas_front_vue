export const PREVIA_KEY = "previa_key";

export const ITEM_CONFIG_KEY = "ic_key";

export const nomeMeses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function formatarMoeda(elemento) {
  let valor = elemento;

  valor = valor + "";
  valor = parseInt(valor.replace(/[\D]+/g, ""));
  valor = valor + "";

  elemento = valor;
  if (valor == "NaN") elemento = "";

  if (valor.length > 6) {
    return (valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2"));
  } else {
    return valor.replace(/([0-9]{2})$/g, ",$1");
  }
}
