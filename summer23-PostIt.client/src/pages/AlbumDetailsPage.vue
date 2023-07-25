<template>
  <div class="container-fluid">
    <div class="row">
      <!-- SECTION Album details -->
      <div v-if="album" class="col-md-3">
        <div class="d-flex justify-content-between align-items-start">
          <img :src="album.coverImg" :alt="album.title" class="cover-img rounded light-shadow">
          <div class="rounded bg-warning p-1 light-shadow">
            <p class="fs-4 fw-bold">
              {{ album.title }}
            </p>
            <p class="fs-4">
              by: {{ album.creator.name }}
            </p>
          </div>
        </div>
      </div>
      <!-- SECTION Album pictures -->
      <div class="col-md-9">
        <div class="row">
          <!-- REVIEW these two lines were how we created a 'dummy' for-loop to test our styling -->
          <!-- <div class="col-3 p-2" v-for="n in 10"> -->
          <!-- <img class="album-picture" :src="pictures[0].imgUrl" alt=""> -->
          <div class="col-3 p-2" v-for="p in pictures">
            <img class="album-picture" :src="p.imgUrl" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js';
import { picturesService } from '../services/PicturesService.js'
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';

export default {
  setup() {
    const route = useRoute()

    async function getAlbumById(albumId) {
      try {
        // const albumId = route.params.albumId
        await albumsService.getAlbumById(albumId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function getPicturesByAlbumId() {
      try {
        const albumId = route.params.albumId
        await picturesService.getPicturesByAlbumId(albumId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }

    // onMounted(() => {
    //   getAlbumById()
    // })

    watchEffect(() => {
      getAlbumById(route.params.albumId)
      getPicturesByAlbumId()
    })

    return {
      album: computed(() => AppState.activeAlbum),
      pictures: computed(() => AppState.pictures)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  max-height: 20vh;
  width: 40%;
}

.album-picture {
  height: 35vh;
  width: 25vh;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  box-shadow: 2px 2px white;
}
</style>