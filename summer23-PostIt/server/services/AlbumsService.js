import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class AlbumsService {

  async getAlbums() {
    const albums = await dbContext.Albums.find()
      .populate('creator', 'name picture')
      .populate('memberCount')
    return albums
  }

  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture').populate('memberCount')
    if (!album) {
      throw new BadRequest(`Album at albumId: ${albumId} does not exist.`)
    }
    return album
  }

  async createAlbum(albumData) {
    const newAlbum = await dbContext.Albums.create(albumData)
    await newAlbum.populate('creator', 'name picture')
    return newAlbum
  }

  async archiveAlbum(albumId, userId) {
    const albumToArchive = await this.getAlbumById(albumId)
    // NOTE .toString to prevent some errors 
    if (albumToArchive.creatorId.toString() != userId) {
      throw new Forbidden('You are not the creator of this album. You cannot archive it.')
    }
    albumToArchive.archived = true
    await albumToArchive.save()
    return albumToArchive
  }
}


export const albumsService = new AlbumsService()