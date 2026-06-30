import express from 'express'

const app = express()

app.get("/" , (req , res) =>{
    res.send("HEllow world")
})

app/get("/api/sandbox/healthz" , (req , res) =>{
    res.status(200).json({
        message : "Sandbox API is healthy"
    })
})

export default app