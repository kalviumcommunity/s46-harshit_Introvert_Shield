const joi = require('joi');

const userJoiSchema = joi.object({
    username: joi.string().min(3).max(20).lowercase().required(),
    email: joi.string().required().email().lowercase(),
    password: joi.string().required().min(5).max(20),
    confirmPassword: joi.ref("password"),
  });

  const introvertJoiSchema = joi.object({
    Place_Type: joi.string().max(32),
    Crowd_Density: joi.string().max(32),
    Seating_Comfort: joi.string(),
    Image_Link: joi.string(),
    WiFi_Availability: joi.string(),
    Posted_By: joi.string()
  });
  
  module.exports = {
    userJoiSchema,
    introvertJoiSchema,
  };