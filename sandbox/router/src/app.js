import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
const app = express()



app.get("/api/sandbox/healthz" , (req , res) =>{
    res.status(200).json({
        message:"Router service is healthy"
    })
})

app.get("/api/sandbox/readyz" , (req , res) =>{
    res.status(200).json({
        message:"Router service is ready"
    })
})

const proxies = {}

const getProxy = (sandboxId , target) =>{
    if(!proxies[sandboxId]) {
        proxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true
        })
    }
    return proxies[sandboxId]
}

app.use((req , res , next) =>{
    const host = req.headers.host
    const sandboxId = host.split('.')[0]
    console.log("Ya samma chai audaichha hai")
    const target = `http://sandbox-service-${sandboxId}`
   return  getProxy(sandboxId , target)(req,res,next)
})


export default app