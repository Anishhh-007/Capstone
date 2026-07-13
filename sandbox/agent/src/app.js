import express from 'express'
import fs from 'fs'
const app = express()

const WORK_DIR = '/workspace'
app.get("/" , (req , res) =>{
    res.status(200).json({
        message:"Hello form agent"
    })
})

app.get("/list-files" , async(req , res) =>{
    try {
        const elements = await fs.promises.readdir(WORK_DIR)
        res.json({
            files: elements
        })

    } catch (error) {
        res.json({
            message: "Error while listing the files",
            err: error.message
        })
    }
})
export default app