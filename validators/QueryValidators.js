const moment = require("moment");
const mongoose = require("mongoose");
const { query } = require("express-validator");
const Responder = require("@service/ResponderService");

class QueryValidations {
  // ObjectID
  static requiredObjectId(field) {
    return query(field)
      .exists()
      .withMessage(`${field} is required`)
      .trim()
      .custom((value) => mongoose.isValidObjectId(value))
      .withMessage(`${field} must be a valid ObjectId`);
  }

  static optionalObjectId(field) {
    return query(field)
      .optional({ values: "falsy" })
      .trim()
      .custom((value) => mongoose.isValidObjectId(value))
      .withMessage(`${field} must be a valid ObjectId`);
  }

  static requiredString(field) {
    return query(field)
      .exists({ checkFalsy: true })
      .withMessage(`${field} is required`)
      .trim()
      .isString()
      .withMessage(`${field} must be a string`);
  }

  static optionalString(field) {
    return query(field)
      .optional({ values: "falsy" })
      .trim()
      .isString()
      .withMessage(`${field} must be a string`);
  }

   // Number
    static requiredNumber(field) {
      return query(field)
        .exists()
        .withMessage(`${field} is required`)
        .trim()
        .isNumeric({ no_symbols: true })
        .withMessage(`${field} must be a number`)
    }
  
    static optionalNumber(field) {
      return query(field)
        .optional({values: 'falsy'})
        .trim()
        .isNumeric({ no_symbols: true })
        .withMessage(`${field} must be a number`)
    }
}
module.exports = QueryValidations;
