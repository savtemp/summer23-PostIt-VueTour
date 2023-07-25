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

}

export const picturesService = new PicturesService()