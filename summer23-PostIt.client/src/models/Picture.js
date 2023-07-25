import { Account } from "./Account.js"

export class Picture {
    constructor(data) {
        this.id = data.id
        this.imgUrl = data.imgUrl
        this.albumId = data.albumId
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creator = new Account(data.creator)
    }
}
