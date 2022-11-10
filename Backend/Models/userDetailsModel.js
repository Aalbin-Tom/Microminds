const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const userDetailSchema = mongoose.Schema(
    {
        address1: {
            type: String,
            required: true,

        },
        address2: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
            required: true,
        },
        postoffice: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        gaurdianname: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


const UserDetail = mongoose.model("userDetail", userDetailSchema);
module.exports = UserDetail;