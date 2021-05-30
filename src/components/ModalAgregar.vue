<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blue" small elevation="0" dark v-on="on" v-bind="attrs">
        Agregar producto <v-icon>mdi-toy-brick-plus-outline</v-icon>
      </v-btn>
    </template>
    <FormularioProducto v-on:onCancel="cancelar" v-on:onSave="guardar" />
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import FormularioProducto from "./FormularioProducto";

export default {
  components: {
    FormularioProducto,
  },
  methods: {
    ...mapActions(["agregarProducto"]),
    async guardar(formulario) {
      const result = await this.agregarProducto(formulario);
      if (result) this.$emit("onSave", true);
      else this.$emit("onSave", false);
      this.dialog = false;
    },
    cancelar() {
      this.dialog = false;
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

