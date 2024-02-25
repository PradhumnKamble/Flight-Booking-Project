const { StatusCodes } = require('http-status-codes');

const info = (req,res)=>{
    res.status(StatusCodes.OK).json({
        success: true,
        message:"api is live",
        error:{},
        data:{},
    })
};
// const info = (req,res)=>{
//     res.statusCode(200).json({
//         success: true,
//         message:"api is live",
//         error:{},
//         data:{},
//     })
// };

module.exports = {
    info
};