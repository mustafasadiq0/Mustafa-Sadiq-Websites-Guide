// نظام تتبع الزيارات للموقع
class VisitTracker {
  constructor() {
    this.storageKey = 'siteVisitData';
    this.initializeTracking();
  }

  // تهيئة نظام التتبع
  initializeTracking() {
    this.recordVisit();
    this.cleanOldData();
  }

  // تسجيل زيارة جديدة
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

  // الحصول على بيانات الزيارات
  getVisitData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading visit data:', error);
      return {};
    }
  }

  // حفظ بيانات الزيارات
  saveVisitData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving visit data:', error);
    }
  }

  // الحصول على إجمالي الزيارات
  getTotalVisits() {
    const data = this.getVisitData();
    return data.totalVisits || 0;
  }

  // الحصول على زيارات اليوم
  getTodayVisits() {
    const today = this.getDateString(new Date());
    const data = this.getVisitData();
    return (data.dailyVisits && data.dailyVisits[today]) || 0;
  }

  // الحصول على زيارات الأسبوع الماضي
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

  // تنظيف البيانات القديمة (الاحتفاظ بآخر 30 يوم فقط)
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

  // تحويل التاريخ إلى نص
  getDateString(date) {
    return date.toISOString().split('T')[0];
  }

  // الحصول على إحصائيات مفصلة
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

export default VisitTracker;

