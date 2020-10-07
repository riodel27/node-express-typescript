/* eslint-disable no-undef */
import express from 'express'

import dependencyInjectorLoader from './dependencyInjector'
import expressLoader from './express'
import Logger from './logger'
import mongoosesLoader from './mongoose'

export default async ({ expressApp }: { expressApp: express.Application }) => {
    await mongoosesLoader()
    Logger.info('✌️ DB loaded and connected!')

    const userModel = {
        name: 'userModel',
        model: require('../models/user').default
    }

    await dependencyInjectorLoader({
        models: [userModel]
    })
    Logger.info('✌️ Dependency Injector loaded')

    await expressLoader({ app: expressApp })
    Logger.info('✌️ Express loaded')
}
