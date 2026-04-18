const moment = require('moment')
const mongoose = require('mongoose')
const { param } = require('express-validator')
const Responder = require('@service/ResponderService')
class ParamValidations{


     // ObjectID
          static requiredObjectId(field) {
            return param(field)
              .exists()
              .withMessage(`${field} is required`)
              .trim()
              .custom((value) => mongoose.isValidObjectId(value))
              .withMessage(`${field} must be a valid ObjectId`)
          }
        
          static optionalObjectId(field) {
            return param(field)
              .optional({ values: 'falsy' })
              .trim()
              .custom((value) => mongoose.isValidObjectId(value))
              .withMessage(`${field} must be a valid ObjectId`)
          }

}

module.exports = ParamValidations