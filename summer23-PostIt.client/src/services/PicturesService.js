import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PicturesService {

    async getPicturesByAlbumId(albumId) {
        const res = await api.get(`api/albums/${albumId}/pictures`)
        logger.log('[GETTING PICTURES]', res.data)
        AppState.pictures = res.data.map(d => new Picture(d))
    }

    async createPicture(formData) {
        const res = await api.post('api/pictures', formData)
        logger.log('[CREATING PICTURE]', res.data)
        const newPicture = new Picture(res.data)
        AppState.pictures.unshift(newPicture)
    }

}

export const picturesService = new PicturesService()