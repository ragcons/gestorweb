<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Sistema Gestor Web
        </q-toolbar-title>

        <q-avatar>
          <!-- Ícone de avatar -->
          <img src="~assets/avatarMulher.png" />
        </q-avatar>

        <q-btn icon="help" flat round />

        <!-- Ícone de e-mail -->
        <q-btn icon="email" flat round />
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/home" label="Home" />
        <q-route-tab to="/page2" label="Comercial" />
        <q-route-tab to="/page3" label="Produtos e Serviços" />
        <q-route-tab to="/page3" label="Compras e Estoque" />
        <q-route-tab to="/page3" label="Financeiro" />
        <q-route-tab to="/page3" label="Gerencial" />
        <q-route-tab to="/page3" label="Ferramentas" />
        <q-route-tab to="/page3" label="Relatórios" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-card-title>
        <div class="text-h6">Barra de Ferramentas</div>
      </q-card-title>

      <!-- Botões organizados em coluna -->
      <div class="q-pa-md flex-column">
        <q-btn-dropdown
          class="glossy"
          color="secondary"
          label="Relógio"
          style="width: 100%; margin-bottom: 8px; padding-right: 100px"
        >
          <q-card class="q-pa-md">
            <q-card-section
              class="q-pt-md flex items-center"
              style="background-color: #728cbd"
            >
              <!-- Conteúdo da coluna azul -->
            </q-card-section>

            <q-card-section class="q-pt-md" style="flex-grow: 1">
              <div class="analog-clock yellow-background">
                <div
                  class="hour-hand"
                  :style="{ transform: `rotate(${getHourRotation()}deg)` }"
                ></div>
                <div
                  class="minute-hand"
                  :style="{ transform: `rotate(${getMinuteRotation()}deg)` }"
                ></div>
                <div
                  class="second-hand"
                  :style="{ transform: `rotate(${getSecondRotation()}deg)` }"
                ></div>
              </div>

              <div
                class="number"
                style="
                  position: absolute;
                  top: 28px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 14px;
                "
              >
                12
              </div>
              <div
                class="number"
                style="
                  position: absolute;
                  bottom: 28px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 14px;
                "
              >
                6
              </div>
              <div
                class="number"
                style="
                  position: absolute;
                  top: 50%;
                  left: 30px;
                  transform: translateY(-50%);
                  font-size: 14px;
                "
              >
                9
              </div>
              <div
                class="number"
                style="
                  position: absolute;
                  top: 50%;
                  right: 30px;
                  transform: translateY(-50%);
                  font-size: 14px;
                "
              >
                3
              </div>
            </q-card-section>
          </q-card>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="glossy"
          color="secondary"
          label="Calendário"
          style="width: 100%; margin-bottom: 8px; padding-right: 75px"
        >
          <q-card
            class="q-pa-md"
            style="max-height: calc(100vh - 320px); overflow-y: auto"
          >
            <div class="q-pa-md">
              <q-date v-model="date" landscape />
            </div>
          </q-card>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="glossy"
          color="secondary"
          label="Previsão do Tempo"
          style="width: 100%; margin-bottom: 8px; padding-right: 20px"
        >
          <q-card class="q-pa-md">
            <q-card-section class="q-pt-md">
              <q-card-title>
                <div class="text-h6">Previsão do Tempo</div>
              </q-card-title>

              <!-- Exibir dados da previsão do tempo -->
              <div v-if="weatherData">
                <div>Temperatura: {{ weatherData.main.temp }}°C</div>
                <div>Descrição: {{ weatherData.weather[0].description }}</div>
                <!-- Adicione mais informações conforme necessário -->
              </div>
              <div v-else>Carregando...</div>
            </q-card-section>
          </q-card>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="glossy"
          color="secondary"
          label="Notícias"
          style="width: 100%; padding-right: 95px; margin-bottom: 8px"
        >
          <q-card class="q-pa-md">
            <q-card-section class="q-pt-md"> </q-card-section>
          </q-card>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="glossy"
          color="secondary"
          label="Relógio teste"
          style="width: 100%; margin-bottom: 8px; padding-right: 100px"
        >
          <div class="q-pa-md">
            <q-time v-model="time" now-btn />
          </div>
        </q-btn-dropdown>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-card class="q-pa-md">
        <q-item class="bg-secondary text-white">
          <q-item-section>
            <q-item-label class="text-h6">RAG</q-item-label>
          </q-item-section>
        </q-item>
        <hr />

        <q-list>
          <q-item
            clickable
            v-for="(item, index) in drawerItems"
            :key="index"
            @click="navigateTo(item.route)"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-item class="bg-secondary text-white">
          <q-item-section>
            <q-item-label class="text-h6">Opções Gerais</q-item-label>
          </q-item-section>
        </q-item>
        <hr />

        <q-item clickable @click="redirectToPrivacyPolicy">
          <q-item-section>
            <q-item-label>Visualizar Últimas Melhorias</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="redirectToPrivacyPolicy">
          <q-item-section>
            <q-item-label>Alterar Senha de Acesso</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="bg-secondary text-white">
          <q-item-section>
            <q-item-label class="text-h6">Visualizar</q-item-label>
          </q-item-section>
        </q-item>
        <hr />

        <q-item clickable @click="redirectToPrivacyPolicy">
          <q-item-section>
            <q-item-label>Política de Privacidade</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </q-drawer>

    <q-page-container class="q-ma-md">
      <div class="title">Olá, <br />{{ userName }}👋!</div>
      <router-view />

      <div class="text-center">
        <div class="subtitle">
          {{ getDayOfWeek() }}, {{ formatDate(selectedDate) }}
        </div>
      </div>

      <div class="text-center">
        <div class="subtitleAcesso">Último Acesso: {{ lastAccessTime }}</div>
      </div>

      <hr />

      <div class="compromissos">
        Compromissos Agendados de {{ formatDate(startDate) }} a
        {{ formatDate(endDate) }}
      </div>


    <div class="q-pa-md">
      <q-table
        flat
        bordered
        title="Compromissos Agendados"
        :rows="rows"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
        hide-pagination
      />

      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
      </div>
    </div>
  </q-page-container>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3
  },

]

export default {
  setup() {
    const rightDrawerOpen = ref(false);
    const leftDrawerOpen = ref(false);
    const currentTime = ref(getCurrentTime());
    const router = useRouter();
    const selectedDate = ref(new Date());
    const userName = ref("João Pereira da Silva Santos"); // Aqui você pode substituir "João" pelo nome do usuário
    const pageMounted = ref(false);
    const lastAccessTime = ref(null);
    const weatherData = ref(null);
    const API_KEY = "3631e66400e0d2f2695239f3b73738fb";

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 2,
      rowsPerPage: 3
      // rowsNumber: xx if getting data from a server
    })

    // Função para obter dados da previsão do tempo
    async function getWeatherData() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Campinas&appid=${API_KEY}&units=metric`
        );
        weatherData.value = response.data;
      } catch (error) {
        console.error("Erro ao obter dados da previsão do tempo:", error);
      }
    }

    function formatDate(date) {
      return `${date.getDate()} de ${getMonthName(
        date.getMonth()
      )} de ${date.getFullYear()}`;
    }

    function getMonthName(monthIndex) {
      const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      return months[monthIndex];
    }

    function getDayOfWeek() {
      const daysOfWeek = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ];
      return daysOfWeek[selectedDate.value.getDay()];
    }

    const drawerItems = [
      { label: "Administração", route: "/administration" },
      { label: "Depto Comercial", route: "/commercial" },
      { label: "Financeiro", route: "/finance" },
      { label: "Suporte Técnico", route: "/technical-support" },
      { label: "Desenvolvimento", route: "/development" },
      { label: "Assistente de Help", route: "/help-assistant" },
    ];

    function redirectToPrivacyPolicy() {
      window.open("https://www.ragsistemas.com.br/politica", "_blank");
    }

    function navigateTo(route) {
      router.push(route);
    }

    function getCurrentTime() {
      const now = new Date();
      return {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      };
    }

    function getHourRotation() {
      return (
        ((currentTime.value.hours % 12) + currentTime.value.minutes / 60) * 30
      );
    }

    function getMinuteRotation() {
      return (currentTime.value.minutes + currentTime.value.seconds / 60) * 6;
    }

    function getSecondRotation() {
      return currentTime.value.seconds * 6;
    }

    function updateClock() {
      currentTime.value = getCurrentTime();
    }

    onMounted(() => {
      // atualiza a hora
      setInterval(updateClock, 1000);

      const lastAccess = window.localStorage.getItem("lastAccess");
      if (lastAccess) {
        lastAccessTime.value = new Date(parseInt(lastAccess));
      } else {
        lastAccessTime.value = new Date();
      }

      getWeatherData();
    });

    pageMounted.value = true;

    const startDate = computed(() => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    });

    const endDate = computed(() => {
      const today = new Date();
      const nextWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      return new Date(
        nextWeek.getFullYear(),
        nextWeek.getMonth(),
        nextWeek.getDate()
      );
    });

    return {
      currentTime,
      getHourRotation,
      getMinuteRotation,
      getSecondRotation,
      selectedDate,
      drawerItems,
      navigateTo,
      redirectToPrivacyPolicy,

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      getDayOfWeek,
      formatDate,
      userName,
      pageMounted,
      lastAccessTime,
      weatherData,
      startDate,
      endDate,
      pagination,
      columns,
      rows,

      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))
    };
  },
};
</script>

<style scoped>
.subtitleAcesso {
  font-size: 13px;
  text-align: right;
}

.title {
  font-size: 21px;
  font-weight: bold;
}

.subtitle {
  font-size: 13px;
  text-align: right;
  font-weight: bold;
}

.yellow-background {
  background-color: #e0e0e0;
}

.analog-clock {
  width: 200px;
  height: 200px;
  border: 5px solid #ffffff;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
}

.q-drawer__content {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.hour-hand,
.minute-hand,
.second-hand {
  position: absolute;
  transform-origin: 50% 100%;
  background-color: #728cbd;
}

.hour-hand {
  width: 8px;
  height: 40px;
  top: 50px;
  left: calc(50% - 4px);
  margin-left: -4px;
  z-index: 3;
}

.minute-hand {
  width: 6px;
  height: 60px;
  top: 30px;
  left: calc(50% - 3px);
  margin-left: -3px;
  z-index: 2;
}

.second-hand {
  width: 4px;
  height: 70px;
  top: 20px;
  left: calc(50% - 2px);
  margin-left: -2px;
  z-index: 1;
}

.custom-drawer-background {
  background-color: #f0f0f0;
}
</style>
