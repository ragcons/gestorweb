<template>
  <img src="~assets/wave.png" class="wave" />
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img
        src="~assets/login.png"
        class="responsive"
        alt="login-image"
        style="height: 90%; margin-left: -15%"
      />
    </div>
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '63%' }"
      >
        <q-card-section>
          <q-avatar size="110px" class="absolute-center shadow-10">
            <img
              src="~assets/avatar.png"
              alt="avatar"
              style="width: 300px; height: 230px; margin-top: -60px"
            />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h5
                class="text-h5 q-my-none text-weight-regular"
                style="
                  font-family: 'Nunito', sans-serif;
                  margin-top: 20px;
                  font-size: 30px;
                "
              >
                Olá Usuário!
              </h5>
              <h7
                class="text-h7 q-my-none text-weight-regular"
                style="font-family: 'Nunito', sans-serif; margin-top: 10px"
              >
                Bem-Vindo ao Sistema Gestor WEB
              </h7>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q.form class="q-glutter-md" @submit.prevent="submitForm">
            <q-input label="Associado" v-model="login.associado"> </q-input>
            <q-input label="Usuário" v-model="login.usuário"> </q-input>
            <q-input label="Senha" type="password" v-model="login.senha">
            </q-input>
            <div>
              <q-btn
                style="margin-top: 25px"
                class="full-width"
                color="primary"
                label="Acessar"
                type="button"
                @click="submitForm"
              ></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-white" to="/login"
                  >Esqueceu a senha?</router-link
                >
              </div>
            </div>
          </q.form>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="q-pa-md">
    <q-btn
      color="secondary"
      @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
    />
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { watch } from "vue";
let $q;

export default {
  name: "LoginView",
  data() {
    return {
      login: {
        associado: "",
        usuário: "",
        senha: "",
      },
    };
  },

  methods: {
    submitForm() {
      if (!this.login.associado || !this.login.usuário) {
        this.$q.notify({
          message: "Por favor, preencha todos os campos obrigatórios.",
          color: "red",
        });
      } else if (!this.login.senha) {
        this.$q.notify({
          message: "Por favor, insira uma senha.",
          color: "red",
        });
      } else {
        console.log("login");
        this.$router.push("/home");
      }
    },
  },
  setup () {
  const $q = useQuasar()

  // Requesting fullscreen mode:
  $q.fullscreen.request()
    .then(() => {
      // success!
    })
    .catch(err => {
      // oh, no!!!
    })

  // Exiting fullscreen mode:
  $q.fullscreen.exit()
    .then(() => {
      // success!
    })
    .catch(err => {
      // oh, no!!!
    })
},
  mounted() {
    $q = useQuasar();
    console.log("$q", $q);
  },
};
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
