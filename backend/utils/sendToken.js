export const sendToken = (res, user, message, statusCode = 200)=>{

    const token = user.getJWTToken(); //this funcion is in user schema

    const options = {
        httpOnly: true,
        expires: new Date(Date.now()+ 15*24*60*60*1000),
        secure: true,
        sameSite: 'none'
    }


    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        user
    })
}