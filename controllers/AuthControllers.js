import ModelUser from "../models/ModelUser.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login=async(req, res)=>{
    const {username, password}=req.body
    if(username=="")
    return res.status(400).json({message:"Username Tidak Boleh Kosong"})
    if(password=="")
    return res.status(400).json({message:"Password Tidak Boleh Kosong"})

    try {
        const checkUsername=await ModelUser.findAll({where:{username:username}})
        if (!checkUsername[0]) return res.status(400).json({message:"Data Tidak Ditemukan"})
        const matchPassword=await bcrypt.compare(password, checkUsername[0].password)
        if (!matchPassword) return res.status(400).json({message:"Password Anda Salah"})
        const userId= checkUsername[0].id_user
        const email= checkUsername[0].email
        const name= checkUsername[0].username

        const token= jwt.sign({userId, email, name}, process.env.ACCESS_TOKEN, {expiresIn:"24H"})
        await ModelUser.update({token:token}, {where:{id_user:userId}})
        const Data= {
            username: name,
            email: email,
            password: password,
            image: checkUsername[0].image,
            userId: userId,
            role_id:checkUsername[0].role_id,
        }
        res.cookie('token', token,{
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({Data, token})
    } catch (error) {
        return res.status(500).json({message:error})
    }

}

export const createUser = async (req, res)=> {
    const {username, email, role}= req.body
    if (username=="")
    return res.status(400).json({message: "Username tidak boleh kosong!"});
    if (email=="")
    return res.status(400).json({message: "Email tidak boleh kosong!"});

    try {
        const checkEmail = await ModelUser.findAll({where: {email: email}});
        const checkUsername = await ModelUser.findAll({where: {username: username}});
        if(checkEmail[0]) return res.status(409).json({message: 'Email sudah terdaftar!'});
        if(checkUsername[0]) return res.status(409).json({message: 'Username sudah terdaftar!'});

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash("abcde123", salt);
        const image = `${req.protocol}://${req.get('host')}/public/profile/default.png`;

        await ModelUser.create({
            email: email,
            username: username,
            password: hashPassword,
            image: image,
            role_id: role
        })

        return res.status(201).json({message: "Akun berhasil di buat!"});
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

export const logout = async(req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.sendStatus(204);
        const user = await ModelUser.findAll({where: {token: token}})
        await ModelUser.update({token: null},{where: {id_user: user[0].id_user}})

        res.clearCookie('token')

        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500);
    }
}