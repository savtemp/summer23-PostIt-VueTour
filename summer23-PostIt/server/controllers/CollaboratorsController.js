import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";


export class CollaboratorsController extends BaseController {
  constructor() {
    super('api/collaborators')
    this.router
      // ROUTES
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCollab)
      .delete('/:collaboratorId', this.deleteCollab)
  }


  async createCollab(req, res, next) {
    try {
      const collabData = req.body
      collabData.accountId = req.userInfo.id
      const collab = await collaboratorsService.createCollab(collabData)
      return res.send(collab)
    } catch (error) {
      next(error)
    }
  }

  async deleteCollab(req, res, next) {
    try {
      const collabId = req.params.collaboratorId
      const userId = req.userInfo.id
      const collab = await collaboratorsService.deleteCollab(collabId, userId)
      return res.send(collab)
    } catch (error) {
      next(error)
    }
  }
}