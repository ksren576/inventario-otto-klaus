<template>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-container>
      <h2 class="text-center">Iniciar sesión</h2>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn
          :disabled="!valid || loading"
          color="success"
          class="mr-4"
          @click="login"
        >
          Iniciar Sesión
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    valid: false,
    email: "",
    password: "",
    emailRules: [
      (v) => !!v || "Este campo es requerido",
      (v) => /.+@.+/.test(v) || "El correo ingresado no es válido",
    ],
    passwordRules: [(v) => !!v || "Este campo es requerido"],
    loading: false,
  }),
  methods: {
    ...mapActions(["autenticarUsuario"]),
    async login() {
      try {
        this.loading = true;
        const result = await this.autenticarUsuario({
          email: this.email,
          password: this.password,
        });
        this.loading = false;
        if (result) this.$router.push({ name: "Home" });
      } catch {
        this.loading = false;
      }
    },
  },
};
</script>

