import React from 'react'
import axios from 'axios'
import authBG from "../assets/authBg.png"
import { IoEye } from "react-icons/io5"
import { IoEyeOff } from "react-icons/io5"

const SignUp = () => {

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventdefault()
 
    try {
      await axios.post("http://localhost:8000/api/auth/signUp", {name, email, password})
    } catch (error) {
      console.log(error)
      alert("Error in sign up")
    }
  }

  return (
    <div className='w-full h-[100vh] bg-cover bg-center flex justify-center items-center' style={{ backgroundImage: `url(${authBG})` }}>
      <form className='flex flex-col items-center justify-center px-5 gap-[20px] shadow-lg shadow-black w-[90%] h-[600px] max-w-[500px] bg-black/10 backdrop-blur'>
        <h1 className='text-black text-[30px] mb-[30px] font-semibold'>Register to <span className='text-yellow-500 font-bold'>Ziya</span></h1>

        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 rounded-full px-5 py-[10px]' />
        
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 rounded-full px-5 py-[10px]' />
        
        <div className='relative w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-lg'>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : 'password'} placeholder='Enter your password' className=' w-full h-full roudned-full outline-none bg-transparent placeholder-gray-300 px-5 py-[10px]' />

          {!showPassword ? <IoEye onClick={()=> setShowPassword(true)} className='absolute text-white text-2xl cursor-pointer top-5 right-5' /> : <IoEyeOff onClick={()=> setShowPassword(false)} className='absolute text-white text-2xl cursor-pointer top-5 right-5' />}
        </div>
        <button className='w-full h-[60px] bg-yellow-500 rounded-full text-white font-semibold hover:bg-yellow-600 duration-300 cursor-pointer hover:scale-95' onClick={handleSubmit} >Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
