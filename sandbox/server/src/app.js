import express from 'express'
import { v7 as uuid } from 'uuid'
import { createPod } from '../kubernetes/pod.js'
import { createService } from '../kubernetes/service.js'
const app = express()

app.get("/", (req, res) => {
    res.send("HEllow world")
})

app.get("/api/sandbox/healthz", (req, res) => {
    res.status(200).json({
        message: "Sandbox API is healthy"
    })
})

app.post("/api/sandbox/start", async (req, res) => {
   try {
     const sandboxId = uuid()
    await Promise.all([
        createPod(sandboxId),
        createService(sandboxId)
    ])
    res.status(201).json({
        message: "Sandbox environment created successfully",
        sandboxId,
        previewURL: `http://${sandboxId}.preview.localhost`
    })
   } catch (error) {
       res.status(500).json({
        message: error.message
    })
   }
})


export default app