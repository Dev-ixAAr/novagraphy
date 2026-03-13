'use client'

import React, { useState, useTransition } from 'react';
import { ContactSubmission } from '@prisma/client';
import { toggleMessageReadStatus, deleteMessage } from './actions';
import { 
  Eye, 
  Trash2, 
  Mail, 
  MailOpen, 
  CheckCircle, 
  X, 
  Calendar,
  User,
  MessageSquare
} from 'lucide-react';

export default function MessageTable({ messages }: { messages: ContactSubmission[] }) {
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggleRead = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleMessageReadStatus(id, currentStatus);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      startTransition(async () => {
        await deleteMessage(id);
        if (selectedMessage?.id === id) setSelectedMessage(null);
      });
    }
  };

  return (
    <>
      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0f1115]/50 border-b border-gray-800 text-gray-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Sender</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {messages.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No messages found.</td></tr>
            ) : (
                messages.map((msg) => (
                <tr key={msg.id} className={`transition-colors group ${msg.read ? 'bg-transparent hover:bg-[#1c2029]' : 'bg-[#1c2029]/50 hover:bg-[#252a35]'}`}>
                    <td className="px-6 py-4">
                        {msg.read ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-800/50 text-gray-500 text-xs border border-gray-700">
                                <MailOpen size={12} /> Read
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/20 font-medium">
                                <Mail size={12} /> New
                            </span>
                        )}
                    </td>
                    <td className="px-6 py-4">
                        <div className="text-white font-medium">{msg.name}</div>
                        <div className="text-xs text-gray-500">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                        {msg.subject || <span className="text-gray-600 italic">No Subject</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                        {new Date(msg.createdAt).toLocaleDateString()} <br/>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <button 
                                onClick={() => setSelectedMessage(msg)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" 
                                title="View Message"
                            >
                                <Eye size={16} />
                            </button>
                            
                            <button 
                                onClick={() => handleToggleRead(msg.id, msg.read)}
                                className={`p-2 rounded-lg transition-colors ${msg.read ? 'text-gray-500 hover:text-yellow-500 hover:bg-yellow-500/10' : 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10'}`}
                                title={msg.read ? "Mark as Unread" : "Mark as Read"}
                            >
                                {msg.read ? <Mail size={16} /> : <CheckCircle size={16} />}
                            </button>

                            <button 
                                onClick={() => handleDelete(msg.id)}
                                className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedMessage(null)} />
            
            <div className="relative bg-[#161920] border border-gray-800 rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <MessageSquare size={20} className="text-indigo-500" />
                        Message Details
                    </h2>
                    <button onClick={() => setSelectedMessage(null)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">From</label>
                            <div className="flex items-center gap-2 text-white">
                                <User size={16} className="text-gray-500" />
                                {selectedMessage.name}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Mail size={16} />
                                <a href={`mailto:${selectedMessage.email}`} className="hover:underline">{selectedMessage.email}</a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                         <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                         <div className="text-lg font-medium text-white">{selectedMessage.subject || 'No Subject'}</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                        <div className="bg-[#0f1115] border border-gray-800 rounded-lg p-4 text-gray-300 leading-relaxed whitespace-pre-wrap min-h-[150px]">
                            {selectedMessage.message}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                        <Calendar size={12} />
                        Sent on {new Date(selectedMessage.createdAt).toLocaleString()}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-800 bg-[#0f1115]/30 rounded-b-xl flex justify-end gap-3">
                    <button 
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="px-4 py-2 text-rose-400 hover:bg-rose-500/10 rounded-lg text-sm font-medium transition-colors"
                    >
                        Delete Message
                    </button>
                    <button 
                        onClick={() => setSelectedMessage(null)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
}