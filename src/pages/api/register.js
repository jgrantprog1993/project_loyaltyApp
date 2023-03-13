// @ts-nocheck
import { API_URL } from "../../utils/config";
import cookie from 'cookie'

export default async (req, res) => {
    if(req.method === 'POST'){
        const {username, fname,lname, business, email, password} = req.body

        const strapiRes = await fetch(`${API_URL}/api/auth/local/register`,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:username, 
                fname:fname,
                lname:lname,
                email:email, 
                business: business,
                email:email,
                password:password })
       

        })

        const data = await strapiRes.json()
        console.log(data)
       
        console.log(strapiRes.ok)

        if(strapiRes.ok){
          
            res.setHeader(
                'Set-Cookie', 
                cookie.serialize ('token', data.jwt, {
                httpOnly: true,
                secure: process.env.Node_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'strict',
                path: '/'
            }))
            res.status(200).json({user: data.user})
            
        }else{
            //console.log(data.error.message)
            //console.log(data)
            res.status(data.error.status).json({message: data.error.message})
        }

        
    }else{
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}