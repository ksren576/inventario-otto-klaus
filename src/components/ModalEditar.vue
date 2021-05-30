<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        x-small
        title="Editar"
        elevation="0"
        v-on="on"
        v-bind="attrs"
        v-if="producto.stock > 0"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <FormularioProducto
      :producto="producto"
      v-on:onCancel="cancelar"
      v-on:onSave="guardar"
    />
  </v-dialog>
</template>

<script>
import FormularioProducto from "./FormularioProducto";
import { mapActions } from "vuex";

export default {
  components: {
    FormularioProducto,
  },
  methods: {
    ...mapActions(["agregarProducto", "editarProducto", "eliminarProducto"]),
    async guardar(formulario) {
      const result = await this.editarProducto(formulario);
      if (result) this.$emit("onSave", true);
      else this.$emit("onSave", false);
      this.dialog = false;
    },
    cancelar() {
      this.dialog = false;
    },
  },
  props: {
    producto: {
      type: Object,
      default: function () {
        return null;
      },
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
