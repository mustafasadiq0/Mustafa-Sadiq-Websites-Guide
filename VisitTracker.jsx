import { useState, useEffect } from 'react';

class VisitTracker {
  constructor() {
    this.storageKey = 'siteVisitData';
    this.initializeTracking();
  }

  initializeTracking() {
    this.recordVisit();
    this.cleanOldData();
  }

  recordVisit() {
    const now = new Date();
    const today = this.getDateString(now);
    
    let visitData = this.getVisitData();
    
    // تحديث إجمالي الزيارات
    visitData.totalVisits = (visitData.totalVisits || 0) + 1;
    
    // تحديث الزيارات اليومية
    if (!visitData.dailyVisits) {
      visitData.dailyVisits = {};
    }
    
    visitData.dailyVisits[today] = (visitData.dailyVisits[today] || 0) + 1;
    
    // تحديث آخر زيارة
    visitData.lastVisit = now.toISOString();
    
    this.saveVisitData(visitData);
  }

  getVisitData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading visit data:', error);
      return {};
    }
  }

  saveVisitData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving visit data:', error);
    }
  }

  getTotalVisits() {
    const data = this.getVisitData();
    return data.totalVisits || 0;
  }

  getTodayVisits() {
    const today = this.getDateString(new Date());
    const data = this.getVisitData();
    return (data.dailyVisits && data.dailyVisits[today]) || 0;
  }

  getWeeklyVisits() {
    const data = this.getVisitData();
    if (!data.dailyVisits) return 0;

    const today = new Date();
    let weeklyTotal = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = this.getDateString(date);
      weeklyTotal += data.dailyVisits[dateString] || 0;
    }

    return weeklyTotal;
  }

  cleanOldData() {
    const data = this.getVisitData();
    if (!data.dailyVisits) return;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const cleanedDailyVisits = {};
    Object.keys(data.dailyVisits).forEach(dateString => {
      const date = new Date(dateString);
      if (date >= thirtyDaysAgo) {
        cleanedDailyVisits[dateString] = data.dailyVisits[dateString];
      }
    });

    data.dailyVisits = cleanedDailyVisits;
    this.saveVisitData(data);
  }

  getDateString(date) {
    return date.toISOString().split('T')[0];
  }

  getDetailedStats() {
    const data = this.getVisitData();
    return {
      totalVisits: this.getTotalVisits(),
      todayVisits: this.getTodayVisits(),
      weeklyVisits: this.getWeeklyVisits(),
      lastVisit: data.lastVisit,
      dailyVisits: data.dailyVisits || {}
    };
  }
}

// Hook لاستخدام تتبع الزيارات في React
export const useVisitTracker = () => {
  const [visitStats, setVisitStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
    weeklyVisits: 0
  });

  useEffect(() => {
    const tracker = new VisitTracker();
    const stats = tracker.getDetailedStats();
    setVisitStats(stats);
  }, []);

  return visitStats;
};

export default VisitTracker;

