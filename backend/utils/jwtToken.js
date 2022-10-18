
/* Creating Token and saving in cookie */

const sendToken  = (user,statuscode,res) => {

    const Token = user.getJWTToken()

     /* option for cookie */
    //   const option = {
    //       expires:new Date(
    //           Date.now + process.env.cookie_Expire * 24 * 60 * 60 * 1000
    //       ),
    //       httpOnly:true
    //   }

      res.status(statuscode).cookie('token' , Token ).json({
          success:true,
          user,
          Token
      })
   

}


module.exports = sendToken