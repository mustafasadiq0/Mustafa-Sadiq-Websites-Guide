import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, TrendingUp, Globe, Shield, BookOpen, Cpu, Users, Building, Lightbulb, Calendar, Eye, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import CustomCursor from './components/CustomCursor';
import { useVisitTracker } from './components/VisitTracker';
import './App.css';
import './styles/haptics.css';

const sitesData = [
    {
        "id": 1,
        "title": "كشف الكذب من نبرة الصوت",
        "description": "أداة أولية لتحليل نبرة الصوت والتعرف على المصداقية.",
        "url": "https://lvekknmx.manus.space/",
        "category": "تقنية",
        "icon": "🎤",
        "visits": 0
    },
    {
        "id": 2,
        "title": "السياحة في العراق",
        "description": "دليل تفاعلي لمعالم العراق السياحية والدينية والتاريخية.",
        "url": "https://wnccwqpy.manus.space/",
        "category": "سياحة",
        "icon": "🏛️",
        "visits": 0
    },
    {
        "id": 3,
        "title": "تقرير الأمن السيبراني العراقي",
        "description": "تحليل لأهم المخاطر والتهديدات حتى حزيران 2025.",
        "url": "https://nvofkjmc.manus.space/",
        "category": "أمن سيبراني",
        "icon": "🛡️",
        "visits": 0
    },
    {
        "id": 4,
        "title": "الاقتصاد الرقمي العراقي 2025",
        "description": "دراسة استراتيجية لمجالات التحول الرقمي في العراق.",
        "url": "https://acqrxtwx.manus.space/",
        "category": "اقتصاد رقمي",
        "icon": "💼",
        "visits": 0
    },
    {
        "id": 5,
        "title": "الصراع العربي الصهيوني",
        "description": "موقع تفاعلي توثيقي يعرض أبرز المحطات والتحولات.",
        "url": "https://svjgbxlw.manus.space/",
        "category": "سياسة",
        "icon": "📊",
        "visits": 0
    },
    {
        "id": 6,
        "title": "خارطة طريق الأمن السيبراني",
        "description": "دليلك الأول في مجال الأمن السيبراني العراقي.",
        "url": "https://qehivuaq.manus.space/",
        "category": "أمن سيبراني",
        "icon": "🗺️",
        "visits": 0
    },
    {
        "id": 7,
        "title": "توجهات البحث العلمي العراقي",
        "description": "تقرير تفاعلي يعرض أكثر المجالات التقنية بحثاً.",
        "url": "https://pcrgxgsm.manus.space/",
        "category": "بحث علمي",
        "icon": "🔬",
        "visits": 0
    },
    {
        "id": 8,
        "title": "السيرة الذاتية التفاعلية",
        "description": "عرض مبوب لمسيرة الدكتور مصطفى صادق.",
        "url": "https://qsmplqbh.manus.space/",
        "category": "شخصي",
        "icon": "👨‍🎓",
        "visits": 0
    },
    {
        "id": 9,
        "title": "موقع العراق والذكاء الاصطناعي",
        "description": "تحليل مكانة العراق الإقليمية في AI حتى منتصف 2025.",
        "url": "https://bpkdxuye.manus.space/",
        "category": "ذكاء اصطناعي",
        "icon": "🤖",
        "visits": 0
    },
    {
        "id": 10,
        "title": "خرائط الذكاء الاصطناعي 2025",
        "description": "مجمع المسارات المحدثة لتعلم الذكاء الاصطناعي.",
        "url": "https://ufzednkr.manus.space/",
        "category": "ذكاء اصطناعي",
        "icon": "🧠",
        "visits": 0
    },
    {
        "id": 11,
        "title": "الذكاء الاصطناعي للأطفال",
        "description": "موارد معرفية مبسطة للصغار والناشئة.",
        "url": "https://cjtxfuks.manus.space/",
        "category": "تعليم",
        "icon": "👶",
        "visits": 0
    },
    {
        "id": 12,
        "title": "بوابة الوظائف والمسارات",
        "description": "معلومات مهنية عن المهارات وفرص العمل بالعراق 2025.",
        "url": "https://saiuhurp.manus.space/",
        "category": "مهني",
        "icon": "💼",
        "visits": 0
    },
    {
        "id": 13,
        "title": "دليل ISO 27001",
        "description": "شرح مبسط للمعيار وتطبيقاته في المؤسسات العراقية.",
        "url": "https://p9hwiqc570p9.manus.space/",
        "category": "أمن سيبراني",
        "icon": "📋",
        "visits": 0
    },
    {
        "id": 14,
        "title": "مساعد اختيار التخصص الجامعي",
        "description": "أداة تفاعلية لاختيار تخصصك الأكاديمي المناسب.",
        "url": "https://csolznii.manus.space/",
        "category": "تعليم",
        "icon": "🎓",
        "visits": 0
    },
    {
        "id": 15,
        "title": "خارطة التحول الرقمي",
        "description": "دليل مؤسساتي لتبني التقنيات الحديثة والتحول الرقمي.",
        "url": "https://srycycxr.manus.space/",
        "category": "تحول رقمي",
        "icon": "🔄",
        "visits": 0
    },
    {
        "id": 16,
        "title": "الاستجابة للحوادث السيبرانية",
        "description": "دليل شامل للإجراءات والأدوات في حالة الاختراق.",
        "url": "https://njmdexej.manus.space/",
        "category": "أمن سيبراني",
        "icon": "🚨",
        "visits": 0
    },
    {
        "id": 17,
        "title": "أدوات اختبار الاختراق",
        "description": "تجميع لأهم أدوات الفحص والتقييم الأمني.",
        "url": "https://gohtrcqo.manus.space/",
        "category": "أمن سيبراني",
        "icon": "🔧",
        "visits": 0
    },
    {
        "id": 18,
        "title": "الأمن السيبراني بلغة المدير العام",
        "description": "تبسيط المفاهيم الأمنية لغير المختصين.",
        "url": "https://ibysedrs.manus.space/",
        "category": "أمن سيبراني",
        "icon": "👔",
        "visits": 0
    },
    {
        "id": 19,
        "title": "حماية الأطفال إلكترونياً",
        "description": "دليل عملي لأولياء الأمور والمربين.",
        "url": "https://srevxwkt.manus.space/",
        "category": "أمن سيبراني",
        "icon": "👨‍👩‍👧‍👦",
        "visits": 0
    },
    {
        "id": 20,
        "title": "خريطة البحث العلمي للمهندسين",
        "description": "مسارات البحث المتقدمة للمهندسين العرب.",
        "url": "https://sdrzioto.manus.space/",
        "category": "بحث علمي",
        "icon": "⚙️",
        "visits": 0
    },
    {
        "id": 21,
        "title": "حماية الهوية الرقمية",
        "description": "خطوات وإرشادات للمواطن العربي الرقمي.",
        "url": "https://alepjbqx.manus.space/",
        "category": "أمن سيبراني",
        "icon": "🆔",
        "visits": 0
    },
    {
        "id": 22,
        "title": "الموسوعة العراقية للذكاء الاصطناعي",
        "description": "قاعدة معرفية مفتوحة (تجريبية).",
        "url": "https://uzllqkur.manus.space/",
        "category": "ذكاء اصطناعي",
        "icon": "📚",
        "visits": 0
    },
    {
        "id": 23,
        "title": "عالم البرمجة",
        "description": "دليلك الأول في مسار تعلم البرمجة من الصفر.",
        "url": "https://htnjbrwd.manus.space/",
        "category": "برمجة",
        "icon": "💻",
        "visits": 0
    },
    {
        "id": 24,
        "title": "عالم الذكاء الاصطناعي",
        "description": "نقطة انطلاقك لفهم وتعلم تقنيات AI.",
        "url": "https://csxhxsvm.manus.space/",
        "category": "ذكاء اصطناعي",
        "icon": "🌟",
        "visits": 0
    },
    {
        "id": 25,
        "title": "خرائط الطريق للمسميات المختلفة للذكاء الاصطناعي",
        "description": "خرائط طريق لمختلف تخصصات الذكاء الاصطناعي.",
        "url": "https://77h9ikcjn7xj.manus.space/",
        "category": "ذكاء اصطناعي",
        "icon": "🗺️",
        "visits": 0
    },
    {
        "id": 26,
        "title": "ابدأ من هنا مسارك في عالم الامن السيبراني",
        "description": "دليلك الشامل لبدء مسيرتك في الأمن السيبراني.",
        "url": "https://ifyfupsa.manus.space/",
        "category": "أمن سيبراني",
        "icon": "🛡️",
        "visits": 0
    },
    {
        "id": 27,
        "title": "ابدأ من هنا مسارك في عالم الحوسبة السحابية (الكلاود)",
        "description": "دليلك لبدء مسيرتك في الحوسبة السحابية.",
        "url": "https://jrjdpzgf.manus.space/",
        "category": "تقنية",
        "icon": "☁️",
        "visits": 0
    },
    {
        "id": 28,
        "title": "ابدأ من هنا مسارك في عالم تطوير الويب",
        "description": "دليلك لبدء مسيرتك في تطوير الويب.",
        "url": "https://arjwjxul.manus.space/",
        "category": "برمجة",
        "icon": "🌐",
        "visits": 0
    },
    {
        "id": 29,
        "title": "ابدأ من هنا مسارك في عالم انترنت الأشياء (IoT)",
        "description": "دليلك لبدء مسيرتك في إنترنت الأشياء.",
        "url": "https://qpsxuuxi.manus.space/",
        "category": "تقنية",
        "icon": "💡",
        "visits": 0
    },
    {
        "id": 30,
        "title": "ابدأ من هنا مسارك في تعلم اللغة الإنجليزية",
        "description": "دليلك لبدء مسيرتك في تعلم اللغة الإنجليزية.",
        "url": "https://ucbdrpgp.manus.space/",
        "category": "تعليم",
        "icon": "🇬🇧",
        "visits": 0
    },
    {
        "id": 31,
        "title": "ابدأ من هنا مسارك في عالم تطوير تطبيقات الهواتف الذكية",
        "description": "دليلك لبدء مسيرتك في تطوير تطبيقات الهواتف الذكية.",
        "url": "https://dwncjxup.manus.space/",
        "category": "برمجة",
        "icon": "📱",
        "visits": 0
    },
    {
        "id": 32,
        "title": "ابدأ من هنا مسارك في عالم تحليل البيانات/علم البيانات",
        "description": "دليلك لبدء مسيرتك في تحليل البيانات وعلم البيانات.",
        "url": "https://iahrwpow.manus.space/",
        "category": "علم البيانات",
        "icon": "📈",
        "visits": 0
    },
    {
        "id": 33,
        "title": "ابدأ من هنا مسار في عالم واجهات الدماغ- الحاسوب",
        "description": "دليلك لبدء مسيرتك في واجهات الدماغ-الحاسوب.",
        "url": "https://tueywiwu.manus.space/",
        "category": "تقنية",
        "icon": "🧠",
        "visits": 0
    },
    {
        "id": 34,
        "title": "ابدأ من هنا مسارك في عالم الجيل الخامس والجيل السادس للأتصالات الخلوية اللاسلكية (5G/6G)",
        "description": "دليلك لبدء مسيرتك في عالم 5G/6G.",
        "url": "https://bscitwfp.manus.space/",
        "category": "تقنية",
        "icon": "📡",
        "visits": 0
    },
    {
        "id": 35,
        "title": "ابدأ من هنا مسارك في عالم الذكاء الاصطناعي التوليدي",
        "description": "دليلك لبدء مسيرتك في الذكاء الاصطناعي التوليدي.",
        "url": "https://apgzytbt.manus.space/",
        "category": "ذكاء اصطناعي",
        "icon": "🎨",
        "visits": 0
    },
    {
        "id": 36,
        "title": "مسارك في عالم الامن السيبراني بلغة المبتدئين",
        "description": "دليلك المبسط للمبتدئين في الأمن السيبراني.",
        "url": "https://ptfrlpiz.manus.space/",
        "category": "أمن سيبراني",
        "icon": "👶",
        "visits": 0
    },
    {
        "id": 37,
        "title": "ابدأ من هنا مسارك في الوظائف الرقمية والعمل عن بعد",
        "description": "دليلك لبدء مسيرتك في الوظائف الرقمية والعمل عن بعد.",
        "url": "https://auwjqduq.manus.space/",
        "category": "مهني",
        "icon": "💼",
        "visits": 0
    },
    {
        "id": 38,
        "title": "ابدأ من هنا دليلك لعالم برمجة الألعاب",
        "description": "دليلك لبدء مسيرتك في برمجة الألعاب.",
        "url": "https://skaazluj.manus.space/",
        "category": "برمجة",
        "icon": "🎮",
        "visits": 0
    },
    {
        "id": 39,
        "title": "ابدأ من هنا دليلك لفهم وبناء نظم التشغيل",
        "description": "دليلك لفهم وبناء نظم التشغيل.",
        "url": "https://uojikxkj.manus.space/",
        "category": "برمجة",
        "icon": "⚙️",
        "visits": 0
    },
    {
        "id": 40,
        "title": "ابدأ من هنا مسارك لتصبح مهندس شبكات",
        "description": "دليلك لبدء مسيرتك لتصبح مهندس شبكات.",
        "url": "https://fklxuqkn.manus.space/",
        "category": "تقنية",
        "icon": "📡",
        "visits": 0
    },
    {
        "id": 41,
        "title": "ابدأ من هنا: البنية التحتية الرقمية للدول والمؤسسات",
        "description": "دليلك لفهم البنية التحتية الرقمية للدول والمؤسسات.",
        "url": "https://ywxjvamp.manus.space/",
        "category": "تقنية",
        "icon": "🏢",
        "visits": 0
    },
    {
        "id": 42,
        "title": "اكتشف أهم 20 وظيفة مستقبلية في تقنيات المعلومات والاتصالات للسنوات العشر القادمة",
        "description": "اكتشف أهم 20 وظيفة مستقبلية في تقنيات المعلومات والاتصالات.",
        "url": "https://thdwlglz.manus.space/",
        "category": "مهني",
        "icon": "🔮",
        "visits": 0
    }
];

const categoryColors = {
  "ذكاء اصطناعي": "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
  "أمن سيبراني": "bg-gradient-to-r from-red-500 to-pink-600 text-white",
  "تعليم": "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
  "بحث علمي": "bg-gradient-to-r from-purple-500 to-indigo-600 text-white",
  "تحول رقمي": "bg-gradient-to-r from-orange-500 to-yellow-600 text-white",
  "اقتصاد رقمي": "bg-gradient-to-r from-yellow-500 to-orange-600 text-white",
  "مهني": "bg-gradient-to-r from-indigo-500 to-blue-600 text-white",
  "تقنية": "bg-gradient-to-r from-cyan-500 to-teal-600 text-white",
  "سياحة": "bg-gradient-to-r from-emerald-500 to-green-600 text-white",
  "سياسة": "bg-gradient-to-r from-gray-500 to-slate-600 text-white",
  "شخصي": "bg-gradient-to-r from-pink-500 to-rose-600 text-white",
  "برمجة": "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
  "علم البيانات": "bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
};

function App() {
  const [sites, setSites] = useState(sitesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const visitStats = useVisitTracker();

  // Load visit counts from localStorage
  useEffect(() => {
    const savedVisits = localStorage.getItem('siteVisits');
    if (savedVisits) {
      const visits = JSON.parse(savedVisits);
      setSites(prevSites => 
        prevSites.map(site => ({
          ...site,
          visits: visits[site.id] || 0
        }))
      );
    }
  }, []);

  // Save visit counts to localStorage
  const saveVisits = (updatedSites) => {
    const visits = {};
    updatedSites.forEach(site => {
      visits[site.id] = site.visits;
    });
    localStorage.setItem('siteVisits', JSON.stringify(visits));
  };

  const handleSiteClick = (siteId) => {
    const updatedSites = sites.map(site => 
      site.id === siteId 
        ? { ...site, visits: site.visits + 1 }
        : site
    );
    setSites(updatedSites);
    saveVisits(updatedSites);
  };

  const filteredSites = sites
    .filter(site => 
      site.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(site => 
      selectedCategory === '' || site.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'visits') return b.visits - a.visits;
      if (sortBy === 'title') return a.title.localeCompare(b.title, 'ar');
      return 0;
    });

  const categories = [...new Set(sites.map(site => site.category))];
  const totalSiteVisits = sites.reduce((sum, site) => sum + site.visits, 0);
  const mostVisited = sites.sort((a, b) => b.visits - a.visits).slice(0, 3);

  return (
    <div className="min-h-screen gradient-bg" dir="rtl">
      <CustomCursor />
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/90 dark:border-gray-700 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                م.ص
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  الدكتور مصطفى صادق الجميلي
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  قناة تعليمية الهدف منها نشر كل ما هو مفيد لطلبة العلم في كل مكان
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 light-effect ripple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">إجمالي المواقع</p>
                  <p className="text-3xl font-bold">{sites.length}</p>
                </div>
                <Globe className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 light-effect ripple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">زيارات المواقع</p>
                  <p className="text-3xl font-bold">{totalSiteVisits.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 light-effect ripple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">زيارات الموقع</p>
                  <p className="text-3xl font-bold">{visitStats.totalVisits.toLocaleString()}</p>
                </div>
                <Eye className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 light-effect ripple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">زيارات اليوم</p>
                  <p className="text-3xl font-bold">{visitStats.todayVisits}</p>
                </div>
                <Calendar className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="البحث في المواقع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 border-2 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">جميع التصنيفات</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="title">ترتيب أبجدي</option>
                <option value="visits">الأكثر زيارة</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Most Visited Sites */}
        {totalSiteVisits > 0 && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                المواقع الأكثر زيارة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mostVisited.map((site, index) => (
                  <div key={site.id} className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 vibrate-on-hover">
                    <div className="text-3xl">{site.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{site.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{site.visits} زيارة</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">#{index + 1}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site, index) => (
            <Card key={site.id} className="group card bg-white/90 backdrop-blur-sm border-0 shadow-xl light-effect ripple fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{site.icon}</div>
                  <Badge className={`${categoryColors[site.category] || "bg-gray-100 text-gray-800"} shadow-lg`}>
                    {site.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors duration-300">{site.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {site.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => {
                      handleSiteClick(site.id);
                      window.open(site.url, '_blank');
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ripple"
                  >
                    زيارة الموقع
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  {site.visits > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                      {site.visits} زيارة
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSites.length === 0 && (
          <div className="text-center py-12 fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              جرب تغيير مصطلحات البحث أو التصنيف
            </p>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  م.ص
                </div>
                <h3 className="text-xl font-bold">الدكتور مصطفى صادق الجميلي</h3>
              </div>
              <p className="text-gray-300 mb-4">
                قناة تعليمية الهدف منها نشر كل ما هو مفيد لطلبة العلم في كل مكان. تركز بالدرج على المحتوى التعليمي والعلمي.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">مدونة مصطفى صادق العلمية</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">السيرة الذاتية</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">المشاريع البحثية</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">تابعنا على</h4>
              <div className="flex space-x-4 space-x-reverse">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full hover:shadow-lg transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full hover:shadow-lg transition-all duration-300">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:shadow-lg transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full hover:shadow-lg transition-all duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 الدكتور مصطفى صادق الجميلي - تم التطوير بالتعاون مع وكيل الذكاء الاصطناعي مانوس
            </p>
            <p className="text-sm text-gray-500 mt-2">
              جميع الحقوق محفوظة | تصميم متجاوب وتفاعلي
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;



