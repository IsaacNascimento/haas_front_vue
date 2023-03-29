import { ITEM_CONFIG_KEY, PREVIA_KEY } from "./constantes";

const setPrevia = (previa) => {
  const newPrevia = JSON.stringify(previa);
  localStorage.setItem(PREVIA_KEY, newPrevia);
};

const getPrevia = () => {
  const data = JSON.parse(localStorage.getItem(PREVIA_KEY));
  return data;
};

const setItemConfig = (ic) => {
  const newIc = JSON.stringify(ic);
  localStorage.setItem(ITEM_CONFIG_KEY, newIc);
};

const getItemConfig = () => {
  const data = JSON.parse(localStorage.getItem(ITEM_CONFIG_KEY));
  return data;
};

export { setPrevia, getPrevia, setItemConfig, getItemConfig };
