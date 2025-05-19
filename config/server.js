import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"

import postRoutes from "../src/post/post.routes.js"
import courseRoutes from "../src/course/course.routes.js"
import commentRoutes from "../src/comment/comment.routes.js"
 import { initCourses } from "../src/course/course.controller.js"
const middlewares = (app)=>{
    app.use(express.urlencoded({extended: false})) 
    app.use(express.json()) 
    app.use(cors()) 
    app.use(helmet()) 
    app.use(morgan('dev')) 
}

const routes = (app)=>{
    app.use('/blog/post', postRoutes)
    app.use('/blog/course', courseRoutes)
    app.use('/blog/comment', commentRoutes)    
}




const conectarDb = async ()=>{
    try {
        await dbConnection()
        console.log('Conexión exitosa con la DB')
    } catch (error) {
        console.log('Error al conectarse a la DB',error)
    }
}


export const initServer = ()=>{
    const app = express()
    const port= process.env.PORT || 3001

    try {
        middlewares(app)
        conectarDb()
        initCourses()
        routes(app)
        app.listen(port)
        console.log(`Server running on port ${port}`)
    } catch (error) {
        console.log(`Server init failed ${error}`)
    }
}