import Razorpay from "razorpay";
import crypto from "crypto";
import Transaction from "../../../models/Transaction.js";
import 'dotenv/config'

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret'
});

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            tran_id
        } = req.body;

        // Verify signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment is verified, update transaction status
            const updatedTransaction = await Transaction.findOneAndUpdate(
                { tran_id: tran_id },
                {
                    paidStatus: true,
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature
                },
                { new: true }
            );

            if (updatedTransaction) {
                return res.status(200).json({
                    success: true,
                    message: "Payment verified successfully",
                    transaction: updatedTransaction
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Transaction not found"
                });
            }
        } else {
            // Signature verification failed
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            success: false,
            message: "Error verifying payment",
            error: error.message
        });
    }
};

export default verifyPayment;
