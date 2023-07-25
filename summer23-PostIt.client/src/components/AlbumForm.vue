<template>
  <form @submit.prevent="createAlbum()">
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input v-model="editable.title" required type="text" class="form-control" id="title" placeholder="Title..."
        maxlength="75" minlength="3">
    </div>
    <div class="mb-3">
      <label for="coverImg" class="form-label">CoverImg</label>
      <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg" placeholder="CoverImg..."
        maxlength="250" minlength="3">
    </div>
    <select v-model="editable.category" required class="form-select mb-3" aria-label="Default select example">
      <option selected disabled value="">Open this select menu</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <div class="text-end">
      <button class="btn btn-success" type="submit">Submit</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      categories: ['cats', 'dogs', 'games', 'gachamon', 'animals', 'misc'],
      async createAlbum() {
        try {
          const albumData = editable.value
          const album = await albumsService.createAlbum(albumData)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
          router.push({ name: 'Album', params: { albumId: album.id } })
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>