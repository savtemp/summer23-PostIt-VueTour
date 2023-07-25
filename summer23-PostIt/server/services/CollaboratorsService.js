import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"


class CollaboratorsService {

  async createCollab(collabData) {

    const album = await albumsService.getAlbumById(collabData.albumId)

    if (album.archived == true) {
      throw new Forbidden(`${album.title} has been archived. You cannot collab on an archived Album.`)
    }

    const newCollab = await dbContext.Collaborators.create(collabData)
    await newCollab.populate('profile', 'name picture')
    return newCollab
  }

  async getCollaboratorsByAlbumId(albumId) {
    const collaborators = await dbContext.Collaborators.find({ albumId }).populate('profile', 'name picture')
    return collaborators
  }

  async getMyCollabAlbums(accountId) {
    const albumCollabs = await dbContext.Collaborators.find({ accountId })
      // NOTE nested populate
      // NOTE call to the initial  album virtual
      // NOTE target the specific album, populate the virtuals on to the original 'album' virtual
      .populate({
        path: 'album',
        populate: {
          path: 'creator memberCount'
        }
      })
    return albumCollabs
  }

  async deleteCollab(collabId, userId) {
    const collabToBeRemoved = await dbContext.Collaborators.findById(collabId)

    if (!collabToBeRemoved) {
      throw new BadRequest(`The collaboration with id ${collabId} does not exist.`)
    }

    if (collabToBeRemoved.accountId != userId) {
      throw new Forbidden('You cannot remove a collaboration that is not yours')
    }

    await collabToBeRemoved.remove()
    return collabToBeRemoved
  }

}


export const collaboratorsService = new CollaboratorsService()