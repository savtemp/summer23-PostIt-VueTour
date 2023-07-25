import { AppState } from "../AppState.js"
import { Collaborator } from "../models/Collaborator.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CollaboratorsService {

    async getCollaboratorsByAlbumId(albumId) {
        const res = await api.get(`api/albums/${albumId}/collaborators`)
        logger.log('[GETTING COLLABS]', res.data)
        AppState.albumCollabs = res.data.map(d => new Collaborator(d))
    }

    async becomeCollaborator(collabData) {
        const res = await api.post('api/collaborators', collabData)
        logger.log('[BECOMING COLLABORATOR]', res.data)
        AppState.albumCollabs.push(new Collaborator(res.data)) //NOTE: reactivity so I don't have to refresh to see the new collaborator
    }

    async removeCollaborator(collabId) {
        const res = await api.delete(`api/collaborators/${collabId}`)
        logger.log('[REMOVING COLLAB]', res.data)
        AppState.albumCollabs = AppState.albumCollabs.filter(c => c.id != collabId)
    }

    async getMyCollabAlbums() {
        try {
            // NOTE: because we are calling this method from the auth service, we want to add a trycatch in case this request fails
            const res = await api.get('account/collaborators')
            logger.log('[GET MY ALBUMS]', res.data)
            AppState.myCollabs = res.data.map(d => new Collaborator(d))
        } catch (error) {
            logger.error(error)
            Pop.toast(error.message, 'error')
        }
    }

}

export const collaboratorsService = new CollaboratorsService()