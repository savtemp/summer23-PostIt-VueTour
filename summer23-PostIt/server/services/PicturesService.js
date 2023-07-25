import { dbContext } from "../db/DbContext.js"



class PicturesService {
  async getPicturesByAlbumId(albumId) {
    // NOTE find method takes in an object, just based on how the method works
    // NOTE find pictures where theres albumIds and only give back the pictures that have that albumId
    // Same as doing this Javascript ---> pictures.filter(p => p.albumId == albumId)

    // NOTE you can also do it this way ---> const pictures = await dbContext.Pictures.find({ albumId: id })
    const pictures = await dbContext.Pictures.find({ albumId }).populate('creator', 'name picture')
    return pictures
  }

  async createPicture(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'name picture')
    return picture
  }
}



export const picturesService = new PicturesService()