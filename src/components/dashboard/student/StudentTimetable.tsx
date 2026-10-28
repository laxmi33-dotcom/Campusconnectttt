import React, { useState } from 'react';
import { Clock, MapPin, User, CalendarDays, BookOpen } from 'lucide-react';
import { useData } from '../../../context/DataContext';

export const StudentTimetable: React.FC = () => {
  const { timetable } = useData();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const daySlots = timetable.filter((t) => t.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Academic Schedule & Timetable
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Semester 6 · B.Tech Computer Science & Engineering · Academic Year 2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
            Room 302 / Academic Tower
          </span>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {days.map((day) => {
          const count = timetable.filter((t) => t.day === day).length;
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{day}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Schedule Slots Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50/75 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <CalendarDays className="w-4 h-4 text-blue-600" />
            <span>Class Timetable for {selectedDay}</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {daySlots.length} Lecture & Lab Sessions
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {daySlots.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No classes scheduled for {selectedDay}.
            </div>
          ) : (
            daySlots.map((slot, idx) => {
              const isLab = slot.subjectCode.includes('-L');

              return (
                <div
                  key={slot.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Time Column */}
                    <div className="w-32 shrink-0">
                      <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{slot.startTime}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 pl-5">
                        to {slot.endTime}
                      </div>
                    </div>

                    {/* Subject & Instructor Details */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {slot.subjectCode}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {slot.subjectName}
                        </h4>
                        {isLab && (
                          <span className="text-[10px] font-semibold uppercase bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded">
                            Laboratory
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{slot.facultyName}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <strong className="text-slate-700">{slot.room}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="self-start sm:self-center shrink-0">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      On Schedule
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Timetable note */}
        <div className="p-4 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Official Department of Computer Science & Engineering Time Matrix</span>
          <span className="text-slate-400">Class timings follow Standard Campus Hours</span>
        </div>
      </div>
    </div>
  );
};
