const { notifyPaymentSuccess } = require('../socket')
const User = require('../models/User')

const paymentCallback = async (req, res) => {
    console.log("📩 Webhook từ SePay:")
    // console.log('Body', req.body); // In ra dữ liệu giao dịch SePay gửi về
    // const get_auth = await req.headers.authorization
    // let api_key = get_auth.split(" ")[1]
    const info = req.body
    const TRANSFER_AMOUNT = 10000 

    // const _id = req.user.id 
    console.log('SEPAY', info.transferAmount, info.content)
    
    try {
        if (info.transferAmount != TRANSFER_AMOUNT) {
            return res.status(400).json({ message: "Amount mismatch" })
        }
        // if (process.env.API_KEY_SEPAY != api_key){
        //     return res.status(400).json({ message: "API KEY mismatch" })
        // }
        if (info.content) {
            const _id = info.content
            await User.findByIdAndUpdate(_id, {isPurchased: true}, {new: true})
            notifyPaymentSuccess()
        }
        return res.json({ message: "success" })
    } catch (err) {
        console.error("Lỗi xử lý webhook:", err);
        return res.status(500).json({ message: "Server error" });
    }
    // console.log('USER', req.user.id)

    return res.json({ message: "success" })
}

/*
*Webhook từ SePay:
*SEPAY Apikey abf34vndnfkd59j45jk33io0or95fqe {
*   gateway: 'BIDV',
*   transactionDate: '2025-09-09 23:36:38',
*   accountNumber: '6860303595',
*   subAccount: '96247N8F3Q',
*   code: null,
*   content: '100342459635 0854747707 iduser',
*   transferType: 'in',
*   description: 'BankAPINotify 100342459635 0854747707 iduser',      
*   transferAmount: 10000,
*   referenceCode: '3eac45a8-d362-4765-9db0-5861f34f36bc',
*   accumulated: 0,
*   id: 22814049
*} 

*/
module.exports = {
    paymentCallback
}