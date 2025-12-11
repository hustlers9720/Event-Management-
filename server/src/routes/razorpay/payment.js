import { Router } from "express";
import createOrder from "../../api/v1/razorpay/createOrder.js";
import verifyPayment from "../../api/v1/razorpay/verifyPayment.js";
import allPaymentHistory from "../../api/v1/razorpay/allPaymentHistory.js";
import findAll from "../../api/v1/razorpay/findAll.js";
import paymentFail from "../../api/v1/razorpay/paymentFail.js";

const router = Router()
router.post('/order', createOrder)
router.post('/payment/verify', verifyPayment)
router.post('/payment/fail/:tranId', paymentFail)
router.get('/order/:email', allPaymentHistory)
router.get('/bookings', findAll)

export default router;