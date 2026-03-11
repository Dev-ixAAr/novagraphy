"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy data for cart items
const dummyCartItems = [
  {
    id: 1,
    name: "Aura - Limited Edition Print",
    price: 120.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Nova Photography Book",
    price: 85.00,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop"
  }
];

export default function CheckoutPage() {
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);

  // Dynamic delivery charge logic
  useEffect(() => {
    const city = shippingDetails.city.trim().toLowerCase();
    if (city === '') {
      setDeliveryCharge(0);
    } else if (city.includes('colombo')) {
      setDeliveryCharge(5.00);
    } else {
      setDeliveryCharge(10.00);
    }
  }, [shippingDetails.city]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = dummyCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const finalTotal = subtotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-20">
        
        {/* Header */}
        <div className="mb-12 mt-10 md:mt-20">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">Checkout</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Complete your order details below to finalize your purchase.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Billing/Shipping Details Form (60%) */}
          <div className="w-full lg:w-[60%]">
            <h2 className="text-xl font-medium mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              Shipping Information
            </h2>
            
            <form className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="firstName" className="text-xs uppercase tracking-wider font-medium text-zinc-500 dark:text-zinc-400">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingDetails.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700/50 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors rounded-none"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="lastName" className="text-xs uppercase tracking-wider font-medium text-zinc-500 dark:text-zinc-400">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingDetails.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700/50 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors rounded-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider font-medium text-zinc-500 dark:text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700/50 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors rounded-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="phone" className="text-xs uppercase tracking-wider font-medium text-zinc-500 dark:text-zinc-400">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700/50 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors rounded-none"
                    placeholder="+94 77 123 4567"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="address" className="text-xs uppercase tracking-wider font-medium text-zinc-500 dark:text-zinc-400">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700/50 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors rounded-none"
                  placeholder="123 Main Street, Apartment 4B"
                />
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                <div className="flex flex-col gap-2 relative group">
                  <div className="flex justify-between items-center">
                    <label htmlFor="city" className="text-xs uppercase tracking-wider font-medium text-zinc-500 dark:text-zinc-400">City</label>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Calculates delivery fee</span>
                  </div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700/50 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors rounded-none"
                    placeholder="Colombo"
                  />
                </div>
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="postalCode" className="text-xs uppercase tracking-wider font-medium text-zinc-500 dark:text-zinc-400">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingDetails.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700/50 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors rounded-none"
                    placeholder="00100"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary (40%) */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 md:p-8 sticky top-32 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-md shadow-sm">
              <h2 className="text-xl font-medium mb-8">Order Summary</h2>
              
              {/* Cart Items List */}
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {dummyCartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h3 className="font-medium text-sm md:text-base line-clamp-2 leading-tight">{item.name}</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1.5">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm md:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Calculation */}
              <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-medium text-zinc-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-sm">Delivery Fee</span>
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {shippingDetails.city.trim() === '' 
                      ? "Pending" 
                      : `$${deliveryCharge.toFixed(2)}`
                    }
                  </span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex justify-between items-end pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-sm uppercase tracking-wider font-medium text-zinc-500">Total</span>
                <span className="text-3xl font-bold tracking-tight">${finalTotal.toFixed(2)}</span>
              </div>

              {/* Action Button */}
              <button 
                type="button"
                className="mt-10 bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-full tracking-widest uppercase font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-900 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.98]"
              >
                Place Order
              </button>
              
              <div className="mt-6 flex justify-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Secure SSL Checkout
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
