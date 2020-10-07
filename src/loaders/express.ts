import bodyParser from 'body-parser'
import { errors } from 'celebrate'
import cors from 'cors'
import { Application, NextFunction, Response } from 'express'

import routes from '../api'
import config from '../config'

export default ({ app }: { app: Application }) => {
    app.enable('trust proxy')
    app.use(cors())
    app.use(bodyParser.json())

    // Load API routes
    app.use(config.api.prefix, routes())

    // handle joi validation errors
    app.use(errors())

    /// catch 404 and forward to error handler
    app.use((_, __, next) => {
        const err: any = new Error('Not Found')
        err['status'] = 404
        next(err)
    })

    /// error handlers
    app.use((err: any, _: any, res: Response, next: NextFunction) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end()
        }
        return next(err)
    })
    app.use((err: any, _: any, res: Response, __: any) => {
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message
            }
        })
    })
}
