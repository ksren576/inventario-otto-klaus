<template>
  <v-dialog v-model="show" persistent max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" :disabled="!valid" v-on="on" v-bind="attrs"
        >Guardar</v-btn
      >
    </template>
    <v-card>
      <h3 class="text-center pt-5 mb-5">
        {{ title }}
      </h3>
      <v-card-actions>
        <v-btn color="error" outlined @click="cancelar">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="aceptar">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    valid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.dialog,
    };
  },
  methods: {
    aceptar() {
      this.show = false;
      this.$emit("onOk");
    },
    cancelar() {
      this.show = false;
      this.$emit("onCancel");
    },
  },
};
</script>
