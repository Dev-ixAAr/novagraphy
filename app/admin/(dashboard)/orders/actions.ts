'use server'

import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer'; // Ensure you have installed: npm install nodemailer @types/nodemailer

export async function updateOrderStatus(
  orderId: string, 
  newStatus: OrderStatus, 
  trackingNumber?: string
) {
  try {
    // 1. Update the Order in DB
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: newStatus,
        // Only update tracking number if provided, otherwise keep existing
        ...(trackingNumber && { trackingNumber })
      },
      include: { items: true } // Include items for the email content
    });
    
    // 2. Email Notification Logic
    // Only send email if status changed to SHIPPED or another critical status
    if (newStatus === 'SHIPPED' || newStatus === 'CONFIRMED') {
      await sendStatusEmail(updatedOrder);
    }

    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error) {
    console.error('Failed to update order status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

// Helper function to send email
async function sendStatusEmail(order: any) {
  // Configure your SMTP transporter here
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = `Order Update #${order.orderNumber}: ${order.status}`;
  
  let message = `Hi ${order.name},\n\nYour order status has been updated to: ${order.status}.`;
  
  if (order.status === 'SHIPPED' && order.trackingNumber) {
    message += `\n\nTracking Number: ${order.trackingNumber}`;
    message += `\nTrack here: https://your-courier.com/track/${order.trackingNumber}`;
  }

  // Basic HTML Template
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Order Status Update</h2>
      <p>Hi ${order.name},</p>
      <p>Your order <strong>#${order.orderNumber}</strong> status is now: <strong style="color: #4F46E5;">${order.status}</strong></p>
      
      ${order.status === 'SHIPPED' && order.trackingNumber ? `
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
        </div>
      ` : ''}
      
      <p>Thank you for shopping with us!</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"Novagraphy Store" <orders@novagraphy.com>',
      to: order.email,
      subject: subject,
      text: message, // Fallback plain text
      html: html,
    });
    console.log(`Email sent to ${order.email} for order ${order.orderNumber}`);
  } catch (emailError) {
    console.error('Failed to send email:', emailError);
    // Don't throw here, we don't want to break the UI if email fails, just log it
  }
}