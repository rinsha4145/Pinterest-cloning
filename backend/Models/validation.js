const Joi = require('joi');

// Define Joi validation schema for User Registration
const userValidationSchema = Joi.object({ 
  firstname: Joi.string()
    .min(2)
    .max(50)
    .optional(),

  lastname: Joi.string()
    .min(2)
    .max(50)
    .allow(null, ''),
    
    profileimage: Joi.string()
    .optional()
    .messages({
      'string.uri': 'Profile image must be a valid URL.',
    }),

  about: Joi.string()
    .max(500)
    .optional()
    .allow(null, ''),

  pronounce: Joi.string()
    .valid('Mr', 'Ms', 'Mx', 'Other')
    .default('Other')
    .messages({
      'any.only': 'Pronounce must be one of Mr, Ms, Mx, or Other.',    
    }),

  website: Joi.string()
    .uri()
    .optional()
    .allow(null, '')
    .messages({
      'string.uri': 'Website must be a valid URL.',
    }),

  username: Joi.string()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email(),

  password: Joi.string()
    .min(6),

  birthdate: Joi.date()
    .less('now'), // Ensure the birthdate is in the past,

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

  followers:  Joi.alternatives()
  .try(Joi.array().items(Joi.string().hex().length(24)), Joi.string())
  .custom((value) => (typeof value === 'string' ? JSON.parse(value) : value))
  .optional()
  .default([]),
  following:  Joi.alternatives()
  .try(Joi.array().items(Joi.string().hex().length(24)), Joi.string())
  .custom((value) => (typeof value === 'string' ? JSON.parse(value) : value))
  .optional()
  .default([]),
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

const postValidationSchema = Joi.object({
  title: Joi.string()
    .max(200)
    .messages({
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required'
    }),
  
  description: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  
  image: Joi.string(),
  link: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Link must be a valid URL'
    }),

  category: Joi.string()
    .messages({
      'any.only': 'Category must be one of the following: Food, Fashion, Travel, DIY, Tech, Home, Other',
      'any.required': 'Category is required'
    }),

    tags: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(),

  likesCount: Joi.number()
    .min(0)
    .default(0)
    .messages({
      'number.min': 'Likes count cannot be negative'
    }),

  commentsCount: Joi.number()
    .min(0)
    .default(0)
    .messages({
      'number.min': 'Comments count cannot be negative'
    }),

  savesCount: Joi.number()
    .min(0)
    .default(0)
    .messages({
      'number.min': 'Saves count cannot be negative'
    }),

  viewsCount: Joi.number()
    .min(0)
    .default(0)
    .messages({
      'number.min': 'Views count cannot be negative'
    }),

  createdAt: Joi.date().default(Date.now)
});

const validateCategory = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.empty": "Category name is required."
    }),
});

const validateBoard =  Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    description: Joi.string()
      .max(500)
      .allow(''),
    userId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/) ,
    posts: Joi.array()
      .items(
        Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/) 
      ),
  });

  


// Validation for registration
module.exports = { userValidationSchema,loginValidationSchema,postValidationSchema,validateCategory,validateBoard };
