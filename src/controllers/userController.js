const User = require("../models/User")
const { getInfoUserService, updateInfoUserService, postSubscribeService, changePasswordService } = require("../services/userService")

const userController = {
    getAllUser: async(req, res) => {
        return res.send('ok')
    },
    getInfoUser: async(req, res) => {
        // console.log(req.user.id)
        const user = await getInfoUserService(req.user.id)
        if(user)
        {
            return res.status(200).json(
                {
                    EC: 0,
                    data: user
                }
            )
        }
        else 
        {
            return res.status(500).json(
                {
                    EC: -1,
                    message: 'Get Info User failed'
                }
            )
        }
    },
    putInfoUser: async(req, res) => {
        const {username, fullname} = req.body
        const user = await updateInfoUserService(req.user.id, {fullname, username})
        console.log('change be', fullname)
        if(user)
        {
            return res.status(200).json(
                {
                    EC: 0,
                    data: user
                }
            )
        }
        else 
        {
            return res.status(500).json(
                {
                    EC: -1,
                    message: 'Update Info User failed'
                }
            )
        }
    },
    putResetPasswordUser: async(req, res) => {
        const user = await changePasswordService(req.body.email, req.body.new_password)
        if(user)
        {
            return res.status(200).json(
                {
                    EC: 0,
                    data: user
                }
            )
        }
        else 
        {
            return res.status(500).json(
                {
                    EC: -1,
                    message: 'Update Password User failed'
                }
            )
        }
    },
    postSubscribe: async(req, res) => {
        const user = await postSubscribeService(req.body.id)
        if(user)
        {
            return res.status(200).json(
                {
                    EC: 0,
                    data: user
                }
            )
        }
        else 
        {
            return res.status(500).json(
                {
                    EC: -1,
                    message: 'Update Info User failed'
                }
            )
        }
    }
}

module.exports = userController