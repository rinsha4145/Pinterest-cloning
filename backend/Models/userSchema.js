const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String,
        default: function() {
        return this.email ? this.email.split('@')[0] : '';
    }  },
    lastname: { type: String, default: ''}, 
    profileImage: { type: String, default: '' },
    about: { type: String, maxLength: 500, default: '' },
    pronounce: { type: String, enum: ['Mr', 'Ms', 'Mx', 'Other'], default: 'Other' },
    website: { type: String, default: '' },
    username: { type: String, unique: true, 
        default: function() {
        return this.email ? this.email.split('@')[0] : '';
    }  },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    birthdate: { type: Date, default: null,required:true },
    countryCode: { type: String, default: ''},
    phoneNumber: { type: String, default: '' },
    addressLine1: { type: String, default: '' },
    addressLine2: { type: String, default: '' },
    city: { type: String,  },
    stateProvinceRegion: { type: String,  },
    postalCode: { type: String, default: '' },
    country: { type: String, default: '' },
    isBlocked: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    followers: [{type: mongoose.Schema.Types.ObjectId,ref: "Users",},],
    following: [{type: mongoose.Schema.Types.ObjectId,ref: "Users",},],
    // saved: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // liked: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // commented: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    googleId: { type: String, default: '' },
  }, { timestamps: true });

module.exports   = mongoose.model('Users', userSchema);
