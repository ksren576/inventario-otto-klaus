import Vue from "vue";
import Vuex from "vuex";
import db, { firebaseApp } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    estaAutenticado: false,
    productos: [],
  },
  mutations: {
    cargarProductos(state, productos) {
      state.productos = [
        ...productos,
      ]
    },
    setearDatosUsuario(state, datosUsuario) {
      state.datosUsuario = { ...datosUsuario };
      state.estaAutenticado = true;
    },
    cerrarSesion(state) {
      state.datosUsuario = null;
      state.estaAutenticado = false;
    },
    editarProducto(state, formulario) {
      state.productos = state.productos.map((producto) => {
        if (producto.idDocumento === formulario.idDocumento) {
          producto.nombre = formulario.nombre;
          producto.stock = formulario.stock;
          producto.precio = formulario.precio;
        }
        return producto;
      });
    },
    agregarProducto(state, formulario) {
      state.productos = [
        ...state.productos,
        formulario
      ]
    },
    eliminarProducto(state, idDocumento) {
      state.productos = state.productos.filter((producto) => producto.idDocumento !== idDocumento);
    }
  },
  getters: {
    estaAutenticado: (state) => state.estaAutenticado,
    getProductos: (state) => state.productos
  },
  actions: {
    async cargarProductos(context) {
      try {
        const datos = await db.collection('productos').get();
        const productosDb = [];

        datos.forEach((doc) => {
          productosDb.push({
            idDocumento: doc.id,
            ...doc.data(),
          })
        })

        context.commit(
          "cargarProductos",
          productosDb,
        );
      } catch (error) {
        console.log(error);
      }
    },
    async autenticarUsuario(context, payload) {
      try {
        const { email, password } = payload;
        const auth = firebaseApp.auth();
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        context.commit('setearDatosUsuario', userCredential);
        return true;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error al autenticar: ${errorCode}, ${errorMessage}`);
        return false;
      }
    },
    async agregarProducto(context, formulario) {
      try {
        const { nombre, stock, precio, codigo } = formulario;
        const document = await db.collection('productos').add({
          codigo,
          nombre,
          stock: Number(stock),
          precio: Number(precio),
        });
        context.commit("agregarProducto", {
          idDocumento: document.id,
          codigo,
          nombre,
          stock: Number(stock),
          precio: Number(precio),
        })
        return true;
      } catch (error) {
        console.error("Error al agregar documento: ", error);
        return false;
      }
    },
    async editarProducto(context, formulario) {
      try {
        const { idDocumento, nombre, stock, precio } = formulario;
        await db.collection('productos').doc(idDocumento).set({
          nombre,
          stock: Number(stock),
          precio: Number(precio),
        }, { merge: true });
        context.commit("editarProducto", {
          nombre,
          stock: Number(stock),
          precio: Number(precio),
        })
        return true;
      } catch (error) {
        console.error("Error al editar documento: ", error);
        return false;
      }
    },
    async eliminarProducto(context, idDocumento) {
      try {
        await db.collection('productos').doc(idDocumento).delete();
        context.commit('eliminarProducto', idDocumento);
        return true;
      } catch (error) {
        console.error("Error al eliminar documento: ", error);
        return false;
      }
    },
    async cerrarSesion(context) {
      try {
        const auth = firebaseApp.auth();
        await auth.signOut();
        context.commit('cerrarSesion');
        return true;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error cerrar sesión: ${errorCode}, ${errorMessage}`);
        return false;
      }
    }
  },
  modules: {},
});
