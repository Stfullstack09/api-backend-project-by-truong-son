// const express = require('express')
import express from 'express'
import initAPIRoute from './router/api'
import configViewEngine from './config/viewEngine'
require('dotenv').config()
const port = Number(process.env.PORT) || 8080
const app = express()

// init API router
initAPIRoute(app)

// config viewEngine
configViewEngine(app)

app.listen(port, () => {
    console.log('App starting successfully with port ' + port)
})