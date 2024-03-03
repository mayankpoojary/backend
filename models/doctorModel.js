const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
      type: String,
    },
  
 
  specialization: {
    type: String,
    required: true,
  },

  clinicName: {
    type: String,
    required: true,
  },
  clinicAddress: {
    type: String,
    required: true,
  },
  clinicContactInformation: {
    type: String,
    required: true,
  },
 
});

module.exports = mongoose.model('Doctor', doctorSchema);
