import Vue from "vue";
import MainForm from "./MainForm.vue";
import TextField from "./TextField.vue";
import SelectField from "./SelectField.vue";
import TextAreaField from "./TextAreaField.vue";
import SubmitButton from "./SubmitButton.vue";
import ModalElement from "./ModalElement.vue";
import OrderItems from "../OrderItems.vue";

[
  MainForm,
  TextField,
  SelectField,
  TextAreaField,
  SubmitButton,
  ModalElement,
  OrderItems,
].forEach((c) => {
  Vue.component(c.name, c);
});
