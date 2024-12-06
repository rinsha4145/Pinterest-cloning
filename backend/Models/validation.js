const Joi = require('joi');

// Define Joi validation schema for User Registration
const userValidationSchema = Joi.object({
  firstname: Joi.string()
    .min(2)
    .max(50)
    .optional(),

  lastname: Joi.string()
    .min(2)
    .max(50),

  profileImage: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Profile image must be a valid URL.',
    }),

  about: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.base': 'About should be a string.',
      'string.max': 'About can have a maximum of 500 characters.',
    }),

  pronounce: Joi.string()
    .valid('Mr', 'Ms', 'Mx', 'Other')
    .default('Other')
    .messages({
      'any.only': 'Pronounce must be one of Mr, Ms, Mx, or Other.',
    }),

  website: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Website must be a valid URL.',
    }),

  username: Joi.string()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': `Hmm...that doesn't look like an email address.`,
      'any.required': `You missed a spot! Don't forget to add your email.`,
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Password should be a string.',
      'string.min': 'Your password is too short! You need 6+ characters.',
      'any.required': 'Password is required.',
    }),

  birthdate: Joi.date()
    .less('now') // Ensure the birthdate is in the past
    .required()
    .messages({
      'date.base': 'Birthdate must be a valid date.',
      'date.less': 'Birthdate must be in the past.',
      'any.required': 'Birthdate is required.',
    }),

  countryCode: Joi.string()
    .optional()
    .messages({
      'string.base': 'Country code should be a string.',
    }),

  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      'string.length': 'Phone number must be 10 digits.',
      'string.pattern.base': 'Phone number must only contain digits.',
    }),

  addressLine1: Joi.string()
    .messages({
      'any.required': 'Address Line 1 is required.',
    }),

  addressLine2: Joi.string()
    .optional()
    .messages({
      'string.base': 'Address Line 2 should be a string.',
    }),

  city: Joi.string()
    .messages({
      'any.required': 'City is required.',
    }),

  stateProvinceRegion: Joi.string()
    .messages({
      'any.required': 'State/Province/Region is required.',
    }),

  postalCode: Joi.string()
    .messages({
      'any.required': 'Postal Code is required.',
    }),

  country: Joi.string()
    .messages({
      'any.required': 'Country is required.',
    }),

    admin: Joi.boolean()
    .default(false)
    .optional()
    .messages({
      'boolean.base': 'Blocked status must be a boolean.',
    }),

  followers: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .optional()
    .messages({
      'number.base': 'Followers must be a number.',
      'number.integer': 'Followers must be an integer.',
      'number.min': 'Followers cannot be negative.',
    }),

  saved: Joi.array()
    .items(Joi.string().hex().length(24)) // ObjectId references
    .optional()
    .messages({
      'array.base': 'Saved posts should be an array.',
      'string.hex': 'Saved posts should contain valid ObjectId references.',
      'string.length': 'Saved posts should contain valid ObjectId references.',
    }),

  liked: Joi.array()
    .items(Joi.string().hex().length(24)) // ObjectId references
    .optional()
    .messages({
      'array.base': 'Liked posts should be an array.',
      'string.hex': 'Liked posts should contain valid ObjectId references.',
      'string.length': 'Liked posts should contain valid ObjectId references.',
    }),

  commented: Joi.array()
    .items(Joi.string().hex().length(24)) // ObjectId references
    .optional()
    .messages({
      'array.base': 'Commented posts should be an array.',
      'string.hex': 'Commented posts should contain valid ObjectId references.',
      'string.length': 'Commented posts should contain valid ObjectId references.',
    }),

  googleId: Joi.string()
    .optional()
    .allow('') // Allow empty strings for users registering without Google
    .messages({
      'string.base': 'Google ID must be a valid string.',
    }),
});
const loginValidationSchema=Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().required()

})

// Validation for registration
module.exports = { userValidationSchema,loginValidationSchema };
