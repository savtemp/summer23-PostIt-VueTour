import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";


export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      // ROUTES
      .get('', this.getAlbums)
      .get('/:albumId', this.getAlbumById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum)
  }

  async createAlbum(req, res, next) {
    try {
      const albumData = req.body
      albumData.creatorId = req.userInfo.id
      const album = await albumsService.createAlbum(albumData)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getAlbums(req, res, next) {
    try {
      const albums = await albumsService.getAlbums()
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumById(req, res, next) {
    try {
      const albumId = req.params.albumId
      const album = await albumsService.getAlbumById(albumId)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbum(req, res, next) {
    try {
      const albumId = req.params.albumId
      const userId = req.userInfo.id
      const album = await albumsService.archiveAlbum(albumId, userId)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

}

