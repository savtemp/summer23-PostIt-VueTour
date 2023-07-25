<template>
  <!-- FIXME album collaborations go here-->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="text-light">My Albums</h1>
      </div>
      <div class="col-md-3" v-for="c in myCollabs" :key="c.id">
        <AlbumCard :albumProp="c.album" />
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="bg-info d-flex justify-content-around p-2 rounded">
          <button class="btn btn-outline-light" @click="filterBy = ''">All</button>
          <button class="btn btn-outline-light" @click="filterBy = 'dogs'">Dogs</button>
          <button class="btn btn-outline-light" @click="filterBy = 'animals'">Animals</button>
          <button class="btn btn-outline-light" @click="filterBy = 'games'">Games</button>
          <button class="btn btn-outline-light" @click="filterBy = 'gachamon'">Gachamon</button>
          <button class="btn btn-outline-light" @click="filterBy = 'misc'">Misc.</button>
        </div>
      </div>
    </div>
    <div class="row pt-3">
      <div v-for="album in albums" :key="album.id" class="col-md-3">
        <!-- <div class="bg-light">
          <img :src="album.coverImg" :alt="album.title" class="img-fluid">
          <h2>{{ album.title }}</h2>
        </div> -->
        <AlbumCard :albumProp="album" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js'
import { AppState } from '../AppState.js';

export default {
  setup() {
    const filterBy = ref('')
    async function getAlbums() {
      try {
        await albumsService.getAlbums()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getAlbums()
    })


    return {
      filterBy,
      albums: computed(() => {
        if (filterBy.value == "") {
          return AppState.albums
        } else {
          return AppState.albums.filter(a => a.category == filterBy.value)
        }
      }),
      myCollabs: computed(() => AppState.myCollabs)
    }
  }
}
</script>

<style scoped lang="scss"></style>
