<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{
        esEdicion ? "Editar producto" : "Agregar producto"
      }}</span>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" v-if="!esEdicion">
              <v-text-field
                v-model="formulario.codigo"
                label="Código (*)"
                :rules="rules.required"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formulario.nombre"
                label="Nombre (*)"
                :rules="rules.required"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formulario.stock"
                label="Stock (*)"
                :rules="rules.numeric"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formulario.precio"
                :rules="rules.numeric"
                label="Precio (*)"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <small>(*) campos obligatorios</small>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="cancelar">Cancelar</v-btn>
      <v-spacer></v-spacer>
      <ModalConfirmacion
        :dialog="mostrarModal"
        v-on:onOk="guardar"
        :valid="valid"
        title="¿Desea guardar los cambios?"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import ModalConfirmacion from "./ModalConfirmacion";

export default {
  components: {
    ModalConfirmacion,
  },
  props: {
    producto: {
      type: Object,
      default: function () {
        return {
          idDocumento: "",
          codigo: "",
          nombre: "",
          stock: "",
          precio: "",
        };
      },
    },
  },
  methods: {
    cancelar() {
      this.$emit("onCancel");
    },
    guardar() {
      this.$emit("onSave", this.formulario);
    },
  },
  data() {
    return {
      valid: false,
      mostrarModal: false,
      formulario: this.producto,
      rules: {
        numeric: [
          (v) => !!v || "Este campo es obligatorio",
          (v) => !isNaN(Number(v)) || "El campo debe ser numérico",
        ],
        required: [(v) => !!v || "Este campo es obligatorio"],
      },
    };
  },
  computed: {
    esEdicion() {
      return !!this.producto.idDocumento;
    },
  },
};
</script>

