import mongoose from 'mongoose'

import { IUser } from '../interfaces/IUser'

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a full name'],
            index: true
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true
        },

        password: { type: String, required: true },

        salt: String,

        role: {
            type: String,
            default: 'user'
        }
    },
    { timestamps: true }
)

// Todo: weights
User.index({ name: 'text', email: 'text' })

// Todo: error handling
User.statics = {
    searchPartial: async function (query: string) {
        //TODO: maybe improve instead of receiving query as string, have an object that has all the fields used in 'Index'. it should be dynamic
        const response = await this.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        })

        return response
    },
    searchFull: async function (query: string) {
        const response = await this.find({ $text: { $search: query, $caseSensitive: false } })
        return response
    },
    search: async function (query: string) {
        const response = await this.searchFull(query)

        if (response.length === 0) {
            const data = await this.searchPartial(query)

            return data
        }

        return response
    }
}

export default mongoose.model<IUser & mongoose.Document>('User', User)
