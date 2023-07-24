import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AlbumsService {
  async getAlbums() {
    const res = await api.get('api/albums')
    logger.log('[GOT ALBUMS]', res.data)

    // AppState.albums = res.data

    const albums = res.data.map(albumPojo => new Album(albumPojo))
    AppState.albums = albums
  }

  async getAlbumById(albumId) {
    const res = await api.get(`api/albums/${albumId}`)
    logger.log('[GOT ONE ALBUM]', res.data)
    const album = new Album(res.data)
    AppState.activeAlbum = album
  }

  async createAlbum(albumData) {
    const res = await api.post('api/albums', albumData)
    logger.log(res.data)
    const album = new Album(res.data)
    return album

  }

  async archiveAlbum(albumId) {
    const res = await api.delete(`api/albums/${albumId}`)
    logger.log('"DELETED" ALBUM', res.data)
  }
}

export const albumsService = new AlbumsService()