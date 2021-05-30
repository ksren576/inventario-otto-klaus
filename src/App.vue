<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <div class="d-flex align-center">
        <h2>Otto Klaus</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn text v-if="autenticado" @click="logout">
        <span class="mr-2">Cerrar sesión</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <br />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions(["cerrarSesion"]),
    async logout() {
      const res = await this.cerrarSesion();
      if (res) this.$router.push("/login");
    },
  },
  computed: mapState({
    autenticado: (state) => state.estaAutenticado,
  }),
};
</script>
