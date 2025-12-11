import Razorpay from "razorpay";
import Transaction from "../../../models/Transaction.js";
import { Types } from "mongoose";
import 'dotenv/config'

// Initialize Razorpay instance with dummy keys (replace with actual keys later)
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret'
});

const createOrder = async (req, res) => {
    const order = req.body;
    const tran_id = new Types.ObjectId().toHexString();

    try {
        // Create Razorpay order
        const options = {
            amount: Math.round(order.amount * 100), // Convert to smallest currency unit (paise for INR, cents for USD)
            currency: order.currency || 'INR',
            receipt: tran_id,
            notes: {
                event_id: order.eventId,
                event_title: order.eventTitle,
                customer_name: order.name,
                customer_email: order.email
            }
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Save initial transaction details to database
        const payment = new Transaction({
            event_id: order.eventId,
            eventImage: order.eventImage,
            eventTitle: order.eventTitle,
            eventDate: order.eventDate,
            total_amount: order.amount,
            currency: order.currency || 'INR',
            tran_id: tran_id,
            razorpay_order_id: razorpayOrder.id,
            cus_name: order.name,
            cus_email: order.email,
            cus_address: order.address || 'N/A',
            paidStatus: false
        });

        await payment.save();

        // Send order details to frontend
        res.status(200).json({
            success: true,
            order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            tran_id: tran_id,
            key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id'
        });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating payment order',
            error: error.message
        });
    }
};

export default createOrder;
