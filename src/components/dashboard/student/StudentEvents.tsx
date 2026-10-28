import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';

export const StudentEvents: React.FC = () => {
  const { user } = useAuth();
  const { events, toggleEventRegistration } = useData();
  const [filter, setFilter] = useState<string>('All');

  const studentId = user?.id || 'user_student_1';

  const categories = ['All', 'Technical', 'Seminar', 'Sports', 'Cultural'];

  const filteredEvents = events.filter(
    (e) => filter === 'All' || e.category === filter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Campus Events & Student Activities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Participate in academic symposiums, hackathons, guest seminars, and cultural festivals
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filter === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((evt) => {
          const isRegistered = evt.registeredUserIds.includes(studentId);
          const seatsTaken = evt.registeredUserIds.length;
          const pct = Math.min(100, (seatsTaken / evt.capacity) * 100);

          return (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                {/* Event Image if available */}
                {evt.image && (
                  <div className="h-44 w-full overflow-hidden relative group">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 backdrop-blur-xs text-white">
                        {evt.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 space-y-3">
                  {!evt.image && (
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700">
                      {evt.category}
                    </span>
                  )}

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Date, Time, Venue Specs */}
                  <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{evt.date}</span>
                      <span>·</span>
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{evt.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.venue}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>Organized by: {evt.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Bar & Action */}
              <div className="p-4 bg-slate-50/75 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="text-[11px] text-slate-500">
                    <strong className="text-slate-800 font-mono">{seatsTaken}</strong> / {evt.capacity} seats filled
                  </div>
                  <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => toggleEventRegistration(evt.id, studentId)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isRegistered
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-red-50 hover:text-red-700 border border-emerald-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>RSVP Confirmed</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Register for Event</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
