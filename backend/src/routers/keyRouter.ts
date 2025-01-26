import express from "express"

export const keyRouter = express.Router()
//api/keys/paypal
keyRouter.get("/paypal", (req, res) => {
  res.send({
    clientId:
      process.env.PAYPAL_CLIENT_ID ||
      "ARIUWoYy4StblvLHRPao1fdNFHY1fdqmsxgt5s6U2UASxdVo16czqozw0Qm5i3CyRbuswiQUEP_7_QnI",
  })
})
