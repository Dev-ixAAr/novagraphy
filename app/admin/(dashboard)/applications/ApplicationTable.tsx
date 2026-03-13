'use client';

import React, { useState, useTransition, useEffect } from 'react';
import {
  ExternalLink,
  Trash2,
  ChevronDown,
  User,
  Mail,
  Calendar,
  Briefcase,
  Eye,
  X,
  Phone,
  Link2,
  Loader2,
  Clock,
} from 'lucide-react';
import { updateApplicationStatus, deleteApplication } from './actions';

type Application = {
  id: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  portfolioUrl: string | null;
  linkedinUrl: string | null;
  status: string;
  createdAt: Date;
};

const STATUS_OPTIONS = ['PENDING', 'REVIEWED', 'REJECTED'];

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  REVIEWED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function ApplicationTable({
  applications,
}: {
  applications: Application[];
}) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  return (
    <>
      <div className="bg-[#161920] border border-gray-800 rounded-xl overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-16 text-center">
            <Briefcase className="mx-auto mb-4 text-gray-600" size={48} />
            <p className="text-gray-400 text-lg font-medium">
              No applications yet
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Applications will appear here once candidates apply.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="text-left px-6 py-4 font-semibold">Applicant</th>
                  <th className="text-left px-6 py-4 font-semibold">Position</th>
                  <th className="text-left px-6 py-4 font-semibold">Links</th>
                  <th className="text-left px-6 py-4 font-semibold">Date</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-right px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {applications.map((app) => (
                  <ApplicationRow
                    key={app.id}
                    app={app}
                    onViewDetails={() => setSelectedApp(app)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Slide-Over Modal */}
      <ApplicationDetailModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
      />
    </>
  );
}

// ─── TABLE ROW ──────────────────────────────────────────────────────────────
function ApplicationRow({
  app,
  onViewDetails,
}: {
  app: Application;
  onViewDetails: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: string) => {
    startTransition(() => {
      updateApplicationStatus(app.id, newStatus);
    });
  };

  const formattedDate = new Date(app.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <tr
      className={`hover:bg-white/[0.02] transition-colors ${isPending ? 'opacity-50' : ''}`}
    >
      {/* Applicant */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <User size={16} className="text-indigo-400" />
          </div>
          <div>
            <p className="font-medium text-white">
              {app.firstName} {app.lastName}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Mail size={11} className="text-gray-500" />
              <span className="text-gray-500 text-xs">{app.email}</span>
            </div>
          </div>
        </div>
      </td>

      {/* Position */}
      <td className="px-6 py-4">
        <span className="text-gray-300 font-medium">{app.jobTitle}</span>
      </td>

      {/* Links */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {app.portfolioUrl && (
            <a
              href={app.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
            >
              Portfolio <ExternalLink size={10} />
            </a>
          )}
          {app.linkedinUrl && (
            <a
              href={app.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              LinkedIn <ExternalLink size={10} />
            </a>
          )}
          {!app.portfolioUrl && !app.linkedinUrl && (
            <span className="text-gray-600 text-xs">—</span>
          )}
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <Calendar size={12} />
          {formattedDate}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="relative inline-block">
          <select
            value={app.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`appearance-none cursor-pointer text-xs font-semibold px-3 py-1.5 pr-7 rounded-full border ${statusColors[app.status] || statusColors.PENDING} bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500/30`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-[#161920] text-gray-300">
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            size={12}
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-60"
          />
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <button
          onClick={onViewDetails}
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
        >
          <Eye size={13} />
          View
        </button>
      </td>
    </tr>
  );
}

// ─── DETAIL SLIDE-OVER MODAL ────────────────────────────────────────────────
function ApplicationDetailModal({
  app,
  onClose,
}: {
  app: Application | null;
  onClose: () => void;
}) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (app) {
      document.body.style.overflow = 'hidden';
      setConfirmDelete(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [app]);

  if (!app) return null;

  const handleDelete = () => {
    startDeleteTransition(async () => {
      await deleteApplication(app.id);
      onClose();
    });
  };

  const handleStatusChange = (newStatus: string) => {
    startUpdateTransition(() => {
      updateApplicationStatus(app.id, newStatus);
    });
  };

  const formattedDate = new Date(app.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(app.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-Over Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-lg bg-[#12141a] border-l border-gray-800 shadow-2xl flex flex-col animate-[slideIn_0.25s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-white">Application Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              ID: {app.id.slice(0, 12)}…
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Applicant Card */}
          <div className="bg-white/[0.03] border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <User size={24} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {app.firstName} {app.lastName}
                </h3>
                <p className="text-sm text-gray-400">Applicant</p>
              </div>
            </div>

            <div className="space-y-3">
              <DetailItem icon={<Briefcase size={15} />} label="Position" value={app.jobTitle} />
              <DetailItem icon={<Mail size={15} />} label="Email" value={app.email} isLink={`mailto:${app.email}`} />
              <DetailItem icon={<Phone size={15} />} label="Phone" value={app.phone} isLink={`tel:${app.phone}`} />
            </div>
          </div>

          {/* Links */}
          <div className="bg-white/[0.03] border border-gray-800 rounded-xl p-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Links & Profiles</h4>
            <div className="space-y-3">
              {app.portfolioUrl ? (
                <a
                  href={app.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10 hover:bg-cyan-500/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Link2 size={15} className="text-cyan-400" />
                    <div>
                      <p className="text-sm text-white font-medium">Portfolio</p>
                      <p className="text-xs text-gray-500 truncate max-w-[280px]">{app.portfolioUrl}</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
                  <Link2 size={15} className="text-gray-600" />
                  <p className="text-sm text-gray-600">No portfolio provided</p>
                </div>
              )}

              {app.linkedinUrl ? (
                <a
                  href={app.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Link2 size={15} className="text-blue-400" />
                    <div>
                      <p className="text-sm text-white font-medium">LinkedIn / GitHub</p>
                      <p className="text-xs text-gray-500 truncate max-w-[280px]">{app.linkedinUrl}</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
                  <Link2 size={15} className="text-gray-600" />
                  <p className="text-sm text-gray-600">No LinkedIn / GitHub provided</p>
                </div>
              )}
            </div>
          </div>

          {/* Status & Meta */}
          <div className="bg-white/[0.03] border border-gray-800 rounded-xl p-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Status & Timeline</h4>

            {/* Status Selector */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Current Status</span>
              <div className="relative">
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={isUpdating}
                  className={`appearance-none cursor-pointer text-xs font-semibold px-4 py-2 pr-8 rounded-full border ${statusColors[app.status] || statusColors.PENDING} bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500/30 disabled:opacity-50`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-[#161920] text-gray-300">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <DetailItem icon={<Calendar size={15} />} label="Applied On" value={formattedDate} />
              <DetailItem icon={<Clock size={15} />} label="Time" value={formattedTime} />
            </div>
          </div>
        </div>

        {/* Footer — Delete */}
        <div className="px-6 py-5 border-t border-gray-800 bg-[#0f1115]">
          {confirmDelete ? (
            <div className="flex items-center gap-3">
              <p className="text-sm text-red-400 flex-1">
                Permanently delete this application?
              </p>
              <button
                onClick={() => setConfirmDelete(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm rounded-lg bg-white/5 text-gray-300 border border-gray-700 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-full py-3 rounded-xl bg-red-500/5 text-red-400 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20 transition-all text-sm font-medium flex items-center justify-center gap-2"
            >
              <Trash2 size={15} />
              Delete Application
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// ─── HELPER: Detail Item ────────────────────────────────────────────────────
function DetailItem({
  icon,
  label,
  value,
  isLink,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: string;
}) {
  const valueContent = isLink ? (
    <a
      href={isLink}
      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
    >
      {value}
    </a>
  ) : (
    <span className="text-sm text-white">{value}</span>
  );

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2.5 text-gray-500">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      {valueContent}
    </div>
  );
}
