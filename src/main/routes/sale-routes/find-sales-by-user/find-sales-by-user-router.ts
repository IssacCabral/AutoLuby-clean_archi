import { Router } from "express";
import { FindSalesByUserRepository } from "@repositories/sale/find-sales-by-user/find-sales-by-user-repository";

const findSalesByUserRouter = Router()

findSalesByUserRouter.get('/sales/:userId', async (req, res) => {
  const findSalesByUserRepository = new FindSalesByUserRepository()
  const {page, limit} = req.query
  const result = await findSalesByUserRepository.find(req.params.userId, Number(page ?? 1), Number(limit ?? 5))
  return res.json({result})
})

export default findSalesByUserRouter