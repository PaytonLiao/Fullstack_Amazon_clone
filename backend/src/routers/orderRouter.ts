import express, { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import { isAuth } from "../utils"
import { Order, OrderModel } from "../models/orderModel"
import { Product } from "../models/productModel"

export const orderRouter = express.Router()

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.user._id })

    res.json(orders)
  })
)

orderRouter.get(
  // /api/orders/:id
  "/:id",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: "Order Not Found" })
    }
  })
)

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    // console.log(req.body.orderItems)
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: "Cart is empty" })
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      } as Order)
      res.status(201).json({ message: "Order Created", order: createdOrder })
    }
  })
)

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = new Date(Date.now())
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }
      const updateOrder = await order.save()
      res.send({ order: updateOrder, message: "Order Paid Successfully" })
    } else {
      res.status(404).send({ message: "Order Not Found" })
    }
  })
)
