'use client'

import React, { useState, useTransition } from 'react';
import { Order, OrderItem, OrderStatus } from '@prisma/client';
import { updateOrderStatus } from './actions';
import { 
  ChevronDown, 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Package, 
  Phone, 
  Mail, 
  Truck,
  Calendar,
  User,
  Copy,
  Check
} from 'lucide-react';

// Type definitions - ඔයාගේ Schema එකේ මේවා තියෙන්න ඕනේ
type ExtendedOrder = Order & { 
  items: OrderItem[];
  address?: string | null;
  city?: string | null;
  phone?: string | null;
  postalCode?: string | null; // Postal code එකත් තිබුනොත් හොඳයි
  trackingNumber?: string | null;
};

const TABS = ['All', 'New/Pending', 'Paid/Process', 'Shipped', 'Completed', 'Cancelled'];

const STATUS_MAP: Record<string, OrderStatus[]> = {
  'All': [],
  'New/Pending': ['PENDING'],
  'Paid/Process': ['PAID', 'CONFIRMED', 'PACKED', 'PROCESSING'],
  'Shipped': ['SHIPPED'],
  'Completed': ['DELIVERED'],
  'Cancelled': ['CANCELLED', 'REFUNDED'],
};

export default function OrderTable({ orders }: { orders: ExtendedOrder[] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false); // For copy address feedback

  // -- Modal States --
  const [selectedOrder, setSelectedOrder] = useState<ExtendedOrder | null>(null);
  
  // Tracking Modal State
  const [trackingModal, setTrackingModal] = useState<{ 
    isOpen: boolean; 
    orderId: string | null; 
    pendingStatus: OrderStatus | null; 
  }>({
    isOpen: false,
    orderId: null,
    pendingStatus: null,
  });
  const [trackingInput, setTrackingInput] = useState('');

  // -- Filtering --
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === 'All' || STATUS_MAP[activeTab].includes(order.status);
    const matchesSearch = 
      (order.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
      (order.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.orderNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // -- Actions --
  
  // ඇඩ්‍රස් එක කොපි කරගන්න ෆන්ෂන් එක
  const copyAddress = (order: ExtendedOrder) => {
    const fullAddress = `${order.name}\n${order.phone || ''}\n${order.address || ''}\n${order.city || ''} ${order.postalCode || ''}`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const initiateStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    // Dropdown එක click කරනකොට Row click එක නවත්තන්න
    e.stopPropagation(); 
    
    const newStatus = e.target.value as OrderStatus;
    if (newStatus === 'SHIPPED') {
      setTrackingModal({ isOpen: true, orderId, pendingStatus: newStatus });
      setTrackingInput('');
    } else {
      handleUpdateConfirm(orderId, newStatus);
    }
  };

  const handleUpdateConfirm = (orderId: string, status: OrderStatus, tracking?: string) => {
    startTransition(async () => {
      await updateOrderStatus(orderId, status, tracking);
      setTrackingModal({ isOpen: false, orderId: null, pendingStatus: null });
    });
  };

  return (
    <div className="space-y-6 relative">
      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-1 bg-[#161920] p-1 rounded-lg border border-gray-800">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-[#252a35]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative group">
            <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
            <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#161920] border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64"
            />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-hidden shadow-sm min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Filter className="w-8 h-8 opacity-20" />
                        <p>No orders found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)} // මෙන්න මෙතනින් තමයි මුළු පේළියම Clickable වෙන්නේ
                    className="hover:bg-[#1c2029] transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium text-indigo-400 font-mono">
                      #{order.orderNumber}
                      {order.trackingNumber && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                          <Truck size={10} /> {order.trackingNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{order.name}</div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <span className="text-white font-medium">{order.items?.length || 0} items</span>
                      <div className="text-xs text-gray-500 truncate max-w-[150px]">
                        {order.items?.map(i => i.name).join(', ') || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-bold">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      {/* Dropdown එක Click කරාම Row එක click නොවී තියෙන්න e.stopPropagation දාලා තියෙන්නේ */}
                      <div className="relative inline-block">
                        <select
                          disabled={isPending}
                          value={order.status}
                          onChange={(e) => initiateStatusChange(e, order.id)}
                          className={`
                            appearance-none bg-[#0f1115] border border-gray-700 text-xs font-medium rounded-md pl-3 pr-8 py-1.5 cursor-pointer outline-none focus:ring-1 focus:ring-indigo-500
                            ${order.status === 'PENDING' ? 'text-yellow-500 border-yellow-500/30' : ''}
                            ${order.status === 'PAID' ? 'text-emerald-500 border-emerald-500/30' : ''}
                            ${order.status === 'SHIPPED' ? 'text-blue-500 border-blue-500/30' : ''}
                            ${order.status === 'CANCELLED' ? 'text-red-500 border-red-500/30' : ''}
                            ${!['PENDING', 'PAID', 'SHIPPED', 'CANCELLED'].includes(order.status) ? 'text-gray-300' : ''}
                          `}
                        >
                          {Object.keys(OrderStatus).map((status) => (
                            <option key={status} value={status} className="bg-[#161920] text-gray-300">
                              {status}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2 w-3 h-3 text-gray-500 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/*                  ORDER DETAILS MODAL                      */}
      {/* ========================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedOrder(null)}
          />
          
          <div className="relative bg-[#161920] border border-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* 1. Header Area */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800 shrink-0 bg-[#1a1d26]">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  #{selectedOrder.orderNumber}
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                     selectedOrder.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                     selectedOrder.status === 'SHIPPED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                     'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* 2. Scrollable Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              
              {/* --- SHIPPING & CONTACT CARD (Highlighted) --- */}
              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-5 mb-8 relative">
                 <div className="absolute top-4 right-4">
                    <button 
                        onClick={() => copyAddress(selectedOrder)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#252a35] hover:bg-indigo-600 hover:text-white text-xs font-medium text-gray-300 rounded-lg transition-all border border-gray-700"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy Info'}
                    </button>
                 </div>

                 <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Truck size={16} /> Shipping Details
                 </h3>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Address Section */}
                    <div>
                        <p className="text-gray-500 text-xs uppercase mb-1">Deliver To</p>
                        <p className="text-white text-base font-medium">{selectedOrder.name}</p>
                        <div className="text-gray-300 text-sm mt-1 leading-relaxed">
                            {selectedOrder.address ? (
                                <>
                                    {selectedOrder.address}<br/>
                                    {selectedOrder.city} {selectedOrder.postalCode}
                                </>
                            ) : (
                                <span className="text-gray-500 italic">No address provided</span>
                            )}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <p className="text-gray-500 text-xs uppercase mb-1">Contact Info</p>
                        <div className="space-y-2 mt-1">
                            <div className="flex items-center gap-2 text-white">
                                <Phone size={14} className="text-indigo-400" />
                                <span className="text-lg font-mono tracking-wide">{selectedOrder.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Mail size={14} className="text-gray-500" />
                                {selectedOrder.email}
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
              
              {/* --- ITEMS TABLE --- */}
              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Package size={14} /> Ordered Items
                 </h3>
                 <div className="bg-[#0f1115] border border-gray-800 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#1a1d26] text-gray-400 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-4 py-3">Item</th>
                                <th className="px-4 py-3 text-center">Qty</th>
                                <th className="px-4 py-3 text-right">Price</th>
                                <th className="px-4 py-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {selectedOrder.items?.map((item) => (
                                <tr key={item.id} className="text-gray-300">
                                    <td className="px-4 py-3 font-medium">{item.name}</td>
                                    <td className="px-4 py-3 text-center text-gray-500">x{item.quantity}</td>
                                    <td className="px-4 py-3 text-right text-gray-500">${item.price.toFixed(2)}</td>
                                    <td className="px-4 py-3 text-right text-white font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-[#1a1d26] border-t border-gray-800">
                            <tr>
                                <td colSpan={3} className="px-4 py-4 text-right text-gray-400 font-medium uppercase text-xs">Total Amount</td>
                                <td className="px-4 py-4 text-right text-white font-bold text-lg">${selectedOrder.totalAmount.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                 </div>
              </div>

            </div>

            {/* 3. Footer Actions */}
            <div className="p-4 border-t border-gray-800 bg-[#1a1d26] flex justify-end gap-3 rounded-b-xl shrink-0">
               <button 
                 onClick={() => setSelectedOrder(null)}
                 className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
               >
                 Close
               </button>
            </div>
            
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/*                   TRACKING MODAL                          */}
      {/* ========================================================= */}
      {trackingModal.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#161920] border border-gray-800 rounded-xl w-full max-w-sm p-6 shadow-2xl">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <Truck size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Add Tracking Info</h3>
             </div>
             
             <p className="text-gray-400 text-sm mb-4">
               Enter tracking number for order <strong>#{filteredOrders.find(o => o.id === trackingModal.orderId)?.orderNumber}</strong>
             </p>

             <input 
               type="text"
               autoFocus
               placeholder="Tracking Number"
               value={trackingInput}
               onChange={(e) => setTrackingInput(e.target.value)}
               className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 mb-6"
             />

             <div className="flex gap-3 justify-end">
               <button 
                  onClick={() => setTrackingModal({ isOpen: false, orderId: null, pendingStatus: null })}
                  className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
               >
                 Cancel
               </button>
               <button 
                  onClick={() => {
                    if (trackingModal.orderId && trackingModal.pendingStatus) {
                      handleUpdateConfirm(trackingModal.orderId, trackingModal.pendingStatus, trackingInput);
                    }
                  }}
                  className="px-4 py-2 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
               >
                 Confirm
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}