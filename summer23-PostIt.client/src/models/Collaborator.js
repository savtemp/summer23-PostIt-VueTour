export class Collaborator {
    constructor(data) {
        this.id = data.id
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.albumId = data.albumId
        this.accountId = data.accountId
        this.profile = data.profile
        this.album = data.album
    }
}

