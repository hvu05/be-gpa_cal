const User = require('../models/User')
const bcrypt = require('bcrypt')

const getInfoUserService = async (userId) => {
    try {
        const result = await User.find({ _id: userId })
        return result
    } catch (e) {
        console.log('error at getInfoUserService', e)
        return null
    }
}
const updateInfoUserService = async (_id, dataUpdate) => {
    try {
        const result = await User.findByIdAndUpdate(
            _id,
            { 
                fullname: dataUpdate.fullname,
                username: dataUpdate.username
             }, // dữ liệu muốn update
            { new: true }      // trả về document sau khi update
        )
        return result
    } catch (e) {
        console.log('error at updateInfoUserService', e)
        return null
    }
}
const postSubscribeService = async (_id) => {
    try {
        const result = await User.findByIdAndUpdate(_id,
            {
                isPurchased: true,
                expiredAt: new Date(9999, 11, 31)
            },
            {new: true}
        )
        return result

    } catch (e) {
        console.log('error at update Subscribe Service', e)
        return null
    }
}
const changePasswordService = async(email, new_password) => {
    try {
        const user = await User.findOne({email: email})
        if(!user) return null

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(new_password, salt)
        
        const _id = user._id
        const result = await User.findByIdAndUpdate(_id, {password: hashed}, {new: true})
        return result
    } catch (e) {
        console.log('error at changePasswordService', e)
        return null
    }
}
module.exports = {
    getInfoUserService,
    updateInfoUserService,
    postSubscribeService,
    changePasswordService
}