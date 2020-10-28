import argon2 from 'argon2'
import { randomBytes } from 'crypto'
import mongodb from 'mongodb'
import { not } from 'ramda'
import { Inject, Service } from 'typedi'
import { Logger } from 'winston'

import { IUser, IUserInputDTO as IUserInput } from '../interfaces/IUser'

@Service()
export default class UserService {
    constructor(
        // eslint-disable-next-line no-undef
        @Inject('userModel') private user: Models.UserModel,
        @Inject('logger') private logger: Logger
    ) {}

    public async FindOneUser(query: { _id: string }): Promise<IUser | null> {
        try {
            const user = await this.user.findOne(query)

            if (not(user)) throw new Error('user not found')

            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async UpdateUser(id: string, userInput: IUserInput): Promise<IUser | null> {
        try {
            if (userInput.email) {
                const existingUserEmail = await this.user.findOne({
                    email: userInput.email
                })

                if (existingUserEmail && existingUserEmail.id !== id)
                    throw new Error('User with this email already exists')
            }

            const salt = randomBytes(32)

            const hashPassword =
                userInput.password &&
                userInput.password.trim() &&
                (await argon2.hash(userInput.password, { salt }))

            const user = await this.user.findOneAndUpdate(
                { _id: id },
                {
                    ...userInput,
                    ...(hashPassword && {
                        salt: salt.toString('hex'),
                        password: hashPassword
                    })
                },
                { new: true }
            )

            //TODO: custom error
            if (not(user)) throw new Error('Unknown user')

            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async DeleteOneUser(filter: {
        _id: string
    }): Promise<mongodb.DeleteWriteOpResultObject['result'] & { deletedCount?: number }> {
        const response = await this.user.deleteOne(filter)
        return response
    }

    public async Search(query: string) {
        const response = await this.user.search(query)
        return response
    }
}
