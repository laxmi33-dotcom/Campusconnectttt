/**
 * =====================================================================
 * CAMPUSCONNECT — PROJECT EXPLANATION VIDEO CONFIGURATION
 * =====================================================================
 * 
 * Replace or set the `VIDEO_URL` below to insert your own college
 * project explanation video or presentation walkthrough!
 * 
 * SUPPORTED VIDEO SOURCES:
 * 1. Local video file in public folder:
 *    e.g., "/campusconnect-demo.mp4" (place your .mp4 in the public/ folder)
 * 2. Direct MP4 web URL:
 *    e.g., "https://example.com/videos/campusconnect-walkthrough.mp4"
 * 3. YouTube video URL (standard or short link):
 *    e.g., "https://www.youtube.com/watch?v=dQw4w9WgXcQ" or "https://youtu.be/..."
 * 
 * If left empty ("") or configured to demo mode, an interactive
 * presentation player with chapter walkthroughs and configuration tips
 * is displayed automatically with zero broken media states.
 */

// >>> INSERT YOUR VIDEO URL HERE: <<<
export const VIDEO_URL: string = "/src/config/campusconnect-demo.mp4"; 

// Optional video poster / thumbnail image URL:
export const VIDEO_POSTER: string = "/src/assets/images/project_video_poster_1793204723172.jpg";

// Project presentation video metadata
export const VIDEO_METADATA = {
  title: "CampusConnect — College Management Portal Demo & Architecture",
  subtitle: "Student, Faculty, and Administrative workflows explained in one place",
  duration: "4:30",
  description: "CampusConnect streamlines student academics, real-time attendance tracking, exam grading, instant college-wide circulars, and departmental leave requests through a unified role-authenticated portal.",
  chapters: [
    { title: "Introduction & Portal Overview", time: "0:00", description: "Centralizing campus communication, authentication, and navigation" },
    { title: "Student Dashboard & Attendance", time: "1:15", description: "Subject attendance tracking, timetable, deadlines, and grade report" },
    { title: "Faculty Management & Grading", time: "2:40", description: "Attendance marking, assignment creation, and leave approvals" },
    { title: "Admin Console & System Insights", time: "3:30", description: "User registry, college circulars, and departmental metrics" }
  ]
};
