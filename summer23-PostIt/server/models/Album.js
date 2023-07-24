import { Schema } from "mongoose";



export const AlbumSchema = new Schema({
  title: { type: String, required: true, maxLength: 75, minLength: 3 },
  archived: { type: Boolean, default: false },
  coverImg: { type: String, required: true, maxLength: 250, minLength: 3 },
  category: { type: String, enum: ['cats', 'dogs', 'games', 'gachamon', 'animals', 'misc'], required: true, default: 'misc' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
  { timestamps: true, toJSON: { virtuals: true } })


AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})