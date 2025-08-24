import express, { Router } from 'express'
import { logIn, logOut, signUp } from '../controllers/auth.controller.js'

const userRouter = Router()

userRouter.post('/register', signUp)
userRouter.post('/login', logIn)
userRouter.get('/logout', logOut)

export default userRouter