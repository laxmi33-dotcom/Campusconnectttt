import React, { useState } from 'react';
import { Bell, Search, Pin, Calendar, User, X, CheckCircle2 } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { Announcement } from '../../../types';

export const StudentAnnouncements: React.FC = () => {
  const { announcements } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingAnnouncement, setReadingAnnouncement] = useState<Announcement | null>(null);

  const categories = ['All', 'Examination', 'Academic', 'Campus Life', 'Administrative'];

  const filtered = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Announcements & Official Circulars
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified university bulletins, examination notifications, and collegiate alerts
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3 my-auto pointer-events-none" />
            <input
              type="text"
              placeholder="Search circulars, exams, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
            No announcements match your search criteria.
          </div>
        ) : (
          filtered.map((ann) => (
            <div
              key={ann.id}
              onClick={() => setReadingAnnouncement(ann)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white hover:border-blue-300 hover:shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                ann.isPinned ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200/90'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  {ann.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                      <Pin className="w-3 h-3 fill-current" />
                      <span>Pinned</span>
                    </span>
                  )}
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {ann.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {ann.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {ann.content}
                </p>

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Issued by {ann.author}</span>
                </div>
              </div>

              <div className="self-end sm:self-center shrink-0">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Read Notice
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Read Notice Modal */}
      {readingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    {readingAnnouncement.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {readingAnnouncement.date}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {readingAnnouncement.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingAnnouncement(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {readingAnnouncement.content}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-100 flex items-center justify-between">
              <span>Authorizing Office:</span>
              <strong className="text-slate-800">{readingAnnouncement.author}</strong>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setReadingAnnouncement(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
