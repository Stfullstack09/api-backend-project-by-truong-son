// const express = require('express')
import express from 'express'
import initAPIRoute from './router/api'
import configViewEngine from './config/viewEngine'
import initWebRoute from './router/web'
import connectDB from './config/connectDB'
require('dotenv').config()
const port = Number(process.env.PORT) || 8080
const app = express()

// config viewEngine
configViewEngine(app)
// init API router and web Route
initAPIRoute(app)
initWebRoute(app)

connectDB()


app.listen(port, () => {
    console.log('App starting successfully with port ' + port)
})