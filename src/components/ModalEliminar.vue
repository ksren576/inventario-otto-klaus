<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        color="error"
        x-small
        title="Eliminar"
        elevation="0"
        v-on="on"
        v-bind="attrs"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <h3 class="text-center pt-5 mb-5">¿Desea eliminar el producto?</h3>
      <v-card-actions>
        <v-btn color="error" outlined @click="cancelar">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="aceptar">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    idDocumento: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["eliminarProducto"]),
    aceptar() {
      this.eliminarProducto(this.idDocumento);
      this.$emit("onSave", true);
      // else this.$emit("onSave", false);
      this.dialog = false;
    },
    cancelar() {
      this.dialog = false;
    },
  },
};
</script>
