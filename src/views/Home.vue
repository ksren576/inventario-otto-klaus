<template>
  <v-container>
    <v-snackbar
      timeout="-1"
      :value="showSuccess"
      absolute
      top
      color="success"
      right
    >
      Los cambios se han guardado <strong>exitosamente.</strong>
    </v-snackbar>
    <v-snackbar
      timeout="-1"
      :value="showError"
      absolute
      top
      color="error"
      right
    >
      Se ha producido un <strong>error</strong> al guardar los cambios.
    </v-snackbar>
    <v-row>
      <v-col cols="auto">
        <h2>Listado de juguetes</h2>
      </v-col>
      <v-spacer />
      <v-col cols="auto" class="mr-auto">
        <ModalAgregar v-on:onSave="handleSave" />
      </v-col>
    </v-row>
    <hr />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Código</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Stock</th>
            <th class="text-left">Precio</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos" :key="item.nombre">
            <td>{{ item.codigo }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.precio }}</td>
            <td>
              <ModalEditar :producto="item" v-on:onSave="handleSave" />
              <ModalEliminar
                :idDocumento="item.idDocumento"
                v-on:onSave="handleSave"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModalAgregar from "../components/ModalAgregar";
import ModalEditar from "../components/ModalEditar";
import ModalEliminar from "../components/ModalEliminar";

export default {
  name: "Home",
  components: {
    ModalAgregar,
    ModalEditar,
    ModalEliminar,
  },
  mounted() {
    this.cargarProductos();
  },
  methods: {
    ...mapActions(["cargarProductos"]),
    handleSave(result) {
      if (result) this.showSuccess = true;
      else this.showError = true;

      setTimeout(() => {
        this.showSuccess = false;
        this.showError = false;
      }, 2500);
    },
  },
  computed: mapState({
    productos: (state) => state.productos,
  }),
  data() {
    return {
      showSuccess: false,
      showError: false,
      idInterval: null,
    };
  },
};
</script>