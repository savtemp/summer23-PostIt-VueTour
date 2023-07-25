<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer>

  <ModalComponent id="createAlbumModal">

    <template #header>
      Create Album
    </template>

    <template #body>
      <AlbumForm />
    </template>

  </ModalComponent>

  <ModalComponent id="createPictureModal">

    <template #header>
      Create Picture
    </template>

    <template #body>
      <PictureForm />
    </template>

  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ModalComponent from './components/ModalComponent.vue'
import AlbumForm from './components/AlbumForm.vue'



export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, AlbumForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

body {
  background-image: url('./assets/img/starbg.png');
  background-size: cover;
  background-attachment: fixed;
}

.light-shadow {
  box-shadow: 4px 4px white;
}
</style>
