<template>
    <form @submit.prevent="createPicture()">
        <div class="mb-3">
            <label for="imgUrl" class="form-label">ImgUrl</label>
            <!-- NOTE: remember we want our v-models to correlate with the properties we need on our data in the server -->
            <input required type="text" v-model="editable.imgUrl" class="form-control" id="imgUrl" placeholder="ImgUrl..."
                maxlength="75" minlength="3">
        </div>

        <div class="text-end">
            <button class="btn btn-success" type="submit">Submit</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { picturesService } from '../services/PicturesService.js';
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

export default {
    setup() {
        const editable = ref({})
        const route = useRoute() // useRoute() gives me access to the CURRENT path I'm on...in this case it is the album details page
        return {
            editable,

            async createPicture() {
                try {
                    // debugger
                    // logger.log('creating picture')
                    const formData = editable.value // NOTE: alias out the editable.value **this is our placeholder object that we are creating from the form inputs**
                    logger.log(formData, 'form data object')
                    // NOTE: cast the albumId from the current album page to the editable object
                    // editable.value.albumId = route.params.albumId
                    formData.albumId = route.params.albumId // NOTE: cast the albumId to our formData object so that it has the necessary properties for the server to create a picture
                    await picturesService.createPicture(formData)

                    editable.value = {} // NOTE: reset the form
                    Modal.getOrCreateInstance('#createPictureModal').hide() // NOTE: close the modal
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        };
    },
};
</script>

<style></style>