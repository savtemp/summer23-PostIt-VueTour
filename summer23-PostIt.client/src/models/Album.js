export class Album {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.archived = data.archived
    this.coverImg = data.coverImg
    this.category = data.category
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.memberCount = data.memberCount
  }
}

// let data = {
//   "_id": "64beb7d4769ac2c34e192531",
//   "title": "Aesthetics",
//   "archived": false,
//   "coverImg": "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
//   "category": "misc",
//   "creatorId": "64b99ca31e3697ecb388c4ed",
//   "__v": 0,
//   "creator": {
//     "_id": "64b99ca31e3697ecb388c4ed",
//     "name": "smolgoblina",
//     "picture": "https://s.gravatar.com/avatar/bb1ded3ad2eb52d670c9e24776f693a9?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsm.png",
//     "id": "64b99ca31e3697ecb388c4ed"
//   },
//   "id": "64beb7d4769ac2c34e192531"
// }