/* =========================================
   XDify - Theme Manager
   ========================================= */

const ThemeManager = {
  storageKey: 'xdify-theme',
  
  get() {
    return localStorage.getItem(this.storageKey) || 'dark';
  },
  
  set(theme) {
    localStorage.setItem(this.storageKey, theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.updateToggle(theme);
  },
  
  toggle() {
    const current = this.get();
    this.set(current === 'dark' ? 'light' : 'dark');
  },
  
  updateToggle(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  },
  
  init() {
    const saved = this.get();
    document.documentElement.setAttribute('data-theme', saved);
    this.updateToggle(saved);
  }
};

/* =========================================
   XDify - Language Manager
   ========================================= */

const translations = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.store': 'Store',
    'nav.gift': 'Gift Code',
    'nav.vote': 'Vote',
    'nav.modes': 'Game Modes',
    'nav.rules': 'Rules',
    'nav.support': 'Support',
    'nav.discord': 'Discord',
    'nav.login': 'Login',

    // Hero
    'hero.badge': 'Java Edition • 1.8.x - 1.21.x',
    'hero.tagline': 'The Ultimate Minecraft Experience',
    'hero.desc': 'Join thousands of players on the most advanced Minecraft Java server. Play your favorite game modes with no lag, no pay-to-win.',
    'hero.btn.play': 'Play Now',
    'hero.btn.discord': 'Join Discord',
    'hero.btn.store': 'Visit Store',
    'hero.ip.copy': 'Copy IP',
    'hero.ip.copied': 'Copied!',
    'hero.version': 'Java 1.8–1.21',
    'hero.mode': 'Survival & Mini-Games',
    'hero.scroll': 'Scroll',

    // Status
    'status.online': 'Online',
    'status.offline': 'Offline',
    'status.players': 'Players',
    'status.max': 'Capacity',
    'status.version': 'Version',
    'status.ping': 'Ping',
    'status.status': 'Status',

    // Stats
    'stats.players': 'Total Players',
    'stats.uptime': 'Uptime',
    'stats.modes': 'Game Modes',
    'stats.support': 'Support',

    // Features
    'features.title': 'Why Choose XDify?',
    'features.eyebrow': 'Features',
    'features.sub': 'Premium features built for the best gaming experience',
    'features.f1.title': 'No Pay-to-Win',
    'features.f1.desc': 'Fair play guaranteed. Our store only offers cosmetics and quality-of-life improvements.',
    'features.f2.title': 'Low Latency',
    'features.f2.desc': 'Powered by enterprise-grade servers with optimized network infrastructure.',
    'features.f3.title': 'Anti-Cheat',
    'features.f3.desc': 'Advanced anti-cheat systems ensure a fair, competitive environment for all.',
    'features.f4.title': 'Active Community',
    'features.f4.desc': 'Join a friendly, welcoming community with regular events and tournaments.',
    'features.f5.title': '24/7 Uptime',
    'features.f5.desc': 'Our servers run 24/7 with automated failover and backup systems.',
    'features.f6.title': 'Regular Updates',
    'features.f6.desc': 'New content and game modes added regularly based on community feedback.',

    // Game Modes
    'modes.eyebrow': 'Game Modes',
    'modes.title': 'Choose Your Battlefield',
    'modes.sub': 'Explore our diverse collection of exciting game modes',
    'modes.bedwars': 'BedWars',
    'modes.bedwars.desc': 'Protect your bed, destroy enemies',
    'modes.skywars': 'SkyWars',
    'modes.skywars.desc': 'Battle on floating islands',
    'modes.skymine': 'SkyMine',
    'modes.skymine.desc': 'Mine and survive in the sky',
    'modes.survival': 'Survival',
    'modes.survival.desc': 'Classic survival adventure',
    'modes.parkour': 'Parkour',
    'modes.parkour.desc': 'Test your parkour skills',
    'modes.practice': 'Practice',
    'modes.practice.desc': 'Sharpen your PvP skills',
    'modes.pvp': 'PvP',
    'modes.pvp.desc': 'Player vs Player combat',
    'modes.duels': 'Duels',
    'modes.duels.desc': '1v1 competitive battles',
    'modes.events': 'Events',
    'modes.events.desc': 'Special limited-time events',
    'modes.join': 'Play Now',

    // CTA
    'cta.title': 'Ready to Dominate?',
    'cta.desc': 'Join the fastest-growing Minecraft server. Your adventure starts now.',
    'cta.play': 'Start Playing',
    'cta.discord': 'Join Our Community',

    // Store
    'store.eyebrow': 'Store',
    'store.title': 'Upgrade Your Experience',
    'store.sub': 'Support the server and gain exclusive cosmetic perks',
    'store.buy': 'Buy Now',
    'store.featured': 'Popular',
    'store.points.eyebrow': 'Points',
    'store.points.title': 'Purchase Points',
    'store.points.sub': 'Use points to unlock exclusive in-game items and cosmetics',
    'store.points.buy': 'Get Points',

    // Rank Features
    'rank.vip.f1': 'Custom chat prefix [VIP]',
    'rank.vip.f2': '5% discount in shop',
    'rank.vip.f3': 'Access to VIP lounge',
    'rank.vip.f4': '2x daily reward',
    'rank.knight.f1': 'Custom chat prefix [Knight]',
    'rank.knight.f2': '10% discount in shop',
    'rank.knight.f3': 'Access to Knight zone',
    'rank.knight.f4': '3x daily reward',
    'rank.knight.f5': 'Custom particles',
    'rank.king.f1': 'Custom chat prefix [King]',
    'rank.king.f2': '15% discount in shop',
    'rank.king.f3': '4x daily reward',
    'rank.king.f4': 'Custom trail effects',
    'rank.king.f5': 'Priority queue',
    'rank.god.f1': 'Custom chat prefix [God]',
    'rank.god.f2': '20% discount in shop',
    'rank.god.f3': '5x daily reward',
    'rank.god.f4': 'Exclusive God cosmetics',
    'rank.god.f5': 'Skip queue always',
    'rank.god.f6': 'Custom kill effects',
    'rank.skipper.f1': 'Custom chat prefix [Skipper]',
    'rank.skipper.f2': '25% discount in shop',
    'rank.skipper.f3': 'Exclusive Skipper events',
    'rank.skipper.f4': '6x daily reward',
    'rank.skipper.f5': 'All God features included',
    'rank.nightstar.f1': 'Custom prefix [NightStar] ✦',
    'rank.nightstar.f2': '30% discount in all shops',
    'rank.nightstar.f3': '10x daily reward',
    'rank.nightstar.f4': 'Exclusive NightStar title',
    'rank.nightstar.f5': 'Custom server announcements',
    'rank.nightstar.f6': 'All previous features',

    // Gift Code
    'gift.eyebrow': 'Gift Code',
    'gift.title': 'Redeem Your Gift',
    'gift.sub': 'Enter your gift code below to claim your exclusive reward',
    'gift.username': 'Minecraft Username',
    'gift.username.ph': 'Enter your username',
    'gift.code': 'Gift Code',
    'gift.code.ph': 'Enter your gift code',
    'gift.btn': 'Redeem Code',
    'gift.success': 'Gift code redeemed successfully! Check your in-game mailbox.',
    'gift.error': 'Invalid or expired gift code. Please try again.',

    // Vote
    'vote.eyebrow': 'Vote',
    'vote.title': 'Support & Vote',
    'vote.sub': 'Vote daily to earn exclusive rewards and help us grow',
    'vote.btn': 'Vote Now',
    'vote.rewards.title': 'Voting Rewards',
    'vote.rewards.sub': 'Every vote earns you fantastic rewards!',
    'vote.r1': '100 Points',
    'vote.r2': 'Mystery Box',
    'vote.r3': 'Vote Crate Key',
    'vote.r4': 'XP Boost 1hr',
    'vote.r5': 'Bonus Coins',

    // Rules
    'rules.eyebrow': 'Rules',
    'rules.title': 'Server Rules',
    'rules.sub': 'Read and follow our rules to keep XDify fun for everyone',
    'rules.chat.title': 'Chat Rules',
    'rules.gameplay.title': 'Gameplay Rules',
    'rules.punishments.title': 'Punishments',
    'rules.fairplay.title': 'Fair Play',

    // Support
    'support.eyebrow': 'Support',
    'support.title': 'Need Help?',
    'support.sub': 'Our team is here to help you 24/7',
    'support.discord.title': 'Discord Support',
    'support.discord.desc': 'Get instant help in our Discord server',
    'support.ticket.title': 'Open a Ticket',
    'support.ticket.desc': 'Submit a ticket for account or billing issues',
    'support.email.title': 'Email Us',
    'support.email.desc': 'Send us an email for detailed inquiries',
    'support.form.title': 'Send a Message',
    'support.form.name': 'Your Name',
    'support.form.name.ph': 'Your name',
    'support.form.email': 'Email Address',
    'support.form.email.ph': 'your@email.com',
    'support.form.subject': 'Subject',
    'support.form.subject.ph': 'What is your issue about?',
    'support.form.msg': 'Message',
    'support.form.msg.ph': 'Describe your issue in detail...',
    'support.form.send': 'Send Message',
    'support.form.sent': 'Message sent! We\'ll reply within 24 hours.',
    'faq.title': 'Frequently Asked Questions',
    'faq.eyebrow': 'FAQ',

    // Footer
    'footer.desc': 'The ultimate Minecraft Java Edition server experience. Join thousands of players worldwide.',
    'footer.links': 'Quick Links',
    'footer.social': 'Follow Us',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2024 XDify. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.refund': 'Refund Policy',
  },
  fa: {
    // Nav
    'nav.home': 'خانه',
    'nav.store': 'فروشگاه',
    'nav.gift': 'کد هدیه',
    'nav.vote': 'رای',
    'nav.modes': 'حالت‌های بازی',
    'nav.rules': 'قوانین',
    'nav.support': 'پشتیبانی',
    'nav.discord': 'دیسکورد',
    'nav.login': 'ورود',

    // Hero
    'hero.badge': 'نسخه جاوا • ۱.۸ تا ۱.۲۱',
    'hero.tagline': 'بهترین تجربه ماینکرفت',
    'hero.desc': 'به هزاران بازیکن در پیشرفته‌ترین سرور ماینکرفت جاوا بپیوندید. بدون لگ، بدون پرداخت برای برنده شدن.',
    'hero.btn.play': 'بازی کن',
    'hero.btn.discord': 'دیسکورد',
    'hero.btn.store': 'فروشگاه',
    'hero.ip.copy': 'کپی IP',
    'hero.ip.copied': 'کپی شد!',
    'hero.version': 'جاوا ۱.۸ تا ۱.۲۱',
    'hero.mode': 'بقا و مینی‌گیم',
    'hero.scroll': 'اسکرول',

    // Status
    'status.online': 'آنلاین',
    'status.offline': 'آفلاین',
    'status.players': 'بازیکنان',
    'status.max': 'ظرفیت',
    'status.version': 'نسخه',
    'status.ping': 'پینگ',
    'status.status': 'وضعیت',

    // Stats
    'stats.players': 'کل بازیکنان',
    'stats.uptime': 'آپتایم',
    'stats.modes': 'حالت بازی',
    'stats.support': 'پشتیبانی',

    // Features
    'features.title': 'چرا XDify را انتخاب کنید؟',
    'features.eyebrow': 'ویژگی‌ها',
    'features.sub': 'ویژگی‌های حرفه‌ای برای بهترین تجربه بازی',
    'features.f1.title': 'بدون پرداخت برای پیروزی',
    'features.f1.desc': 'بازی منصفانه تضمین شده. فروشگاه ما فقط آیتم‌های تزئینی ارائه می‌دهد.',
    'features.f2.title': 'تاخیر کم',
    'features.f2.desc': 'با سرورهای سازمانی و زیرساخت شبکه بهینه‌سازی شده.',
    'features.f3.title': 'ضد تقلب',
    'features.f3.desc': 'سیستم‌های پیشرفته ضد تقلب محیطی منصفانه برای همه ایجاد می‌کنند.',
    'features.f4.title': 'جامعه فعال',
    'features.f4.desc': 'به جامعه‌ای دوستانه با رویدادها و مسابقات منظم بپیوندید.',
    'features.f5.title': 'آپتایم ۲۴/۷',
    'features.f5.desc': 'سرورهای ما ۲۴/۷ با سیستم‌های پشتیبان‌گیری خودکار کار می‌کنند.',
    'features.f6.title': 'به‌روزرسانی منظم',
    'features.f6.desc': 'محتوای جدید بر اساس بازخورد جامعه به‌صورت منظم اضافه می‌شود.',

    // Game Modes
    'modes.eyebrow': 'حالت‌های بازی',
    'modes.title': 'میدان جنگت را انتخاب کن',
    'modes.sub': 'مجموعه‌ای متنوع از حالت‌های بازی هیجان‌انگیز',
    'modes.bedwars': 'بدوارز',
    'modes.bedwars.desc': 'تخت خود را محافظت کن، دشمنان را نابود کن',
    'modes.skywars': 'اسکای‌وارز',
    'modes.skywars.desc': 'نبرد روی جزایر شناور',
    'modes.skymine': 'اسکای‌ماین',
    'modes.skymine.desc': 'معدن‌کاری و بقا در آسمان',
    'modes.survival': 'بقا',
    'modes.survival.desc': 'ماجراجویی کلاسیک بقا',
    'modes.parkour': 'پارکور',
    'modes.parkour.desc': 'مهارت‌های پارکور خود را آزمایش کن',
    'modes.practice': 'تمرین',
    'modes.practice.desc': 'مهارت‌های PvP خود را تقویت کن',
    'modes.pvp': 'PvP',
    'modes.pvp.desc': 'مبارزه بازیکن در برابر بازیکن',
    'modes.duels': 'دوئل',
    'modes.duels.desc': 'نبردهای رقابتی ۱ در مقابل ۱',
    'modes.events': 'رویدادها',
    'modes.events.desc': 'رویدادهای ویژه محدود',
    'modes.join': 'بازی کن',

    // CTA
    'cta.title': 'آماده‌ای که مسلط شی؟',
    'cta.desc': 'به سریع‌ترین سرور ماینکرفت در حال رشد بپیوند. ماجراجویی‌ات همین الان شروع می‌شه.',
    'cta.play': 'شروع بازی',
    'cta.discord': 'جامعه ما',

    // Store
    'store.eyebrow': 'فروشگاه',
    'store.title': 'تجربه‌ات را ارتقا بده',
    'store.sub': 'از سرور حمایت کن و امتیازات تزئینی انحصاری کسب کن',
    'store.buy': 'خرید',
    'store.featured': 'محبوب',
    'store.points.eyebrow': 'امتیاز',
    'store.points.title': 'خرید امتیاز',
    'store.points.sub': 'از امتیازها برای باز کردن آیتم‌های انحصاری در بازی استفاده کن',
    'store.points.buy': 'خرید امتیاز',

    // Rank Features (FA)
    'rank.vip.f1': 'پیشوند چت اختصاصی [VIP]',
    'rank.vip.f2': '۵٪ تخفیف در فروشگاه',
    'rank.vip.f3': 'دسترسی به لانج VIP',
    'rank.vip.f4': '۲x جایزه روزانه',
    'rank.knight.f1': 'پیشوند چت اختصاصی [Knight]',
    'rank.knight.f2': '۱۰٪ تخفیف در فروشگاه',
    'rank.knight.f3': 'دسترسی به منطقه Knight',
    'rank.knight.f4': '۳x جایزه روزانه',
    'rank.knight.f5': 'ذرات اختصاصی',
    'rank.king.f1': 'پیشوند چت اختصاصی [King]',
    'rank.king.f2': '۱۵٪ تخفیف در فروشگاه',
    'rank.king.f3': '۴x جایزه روزانه',
    'rank.king.f4': 'جلوه‌های مسیر اختصاصی',
    'rank.king.f5': 'صف اولویت',
    'rank.god.f1': 'پیشوند چت اختصاصی [God]',
    'rank.god.f2': '۲۰٪ تخفیف در فروشگاه',
    'rank.god.f3': '۵x جایزه روزانه',
    'rank.god.f4': 'آیتم‌های تزئینی انحصاری God',
    'rank.god.f5': 'همیشه صف را رد کن',
    'rank.god.f6': 'جلوه‌های کشتن اختصاصی',
    'rank.skipper.f1': 'پیشوند چت اختصاصی [Skipper]',
    'rank.skipper.f2': '۲۵٪ تخفیف در فروشگاه',
    'rank.skipper.f3': 'رویدادهای انحصاری Skipper',
    'rank.skipper.f4': '۶x جایزه روزانه',
    'rank.skipper.f5': 'تمام ویژگی‌های God',
    'rank.nightstar.f1': 'پیشوند [NightStar] ✦',
    'rank.nightstar.f2': '۳۰٪ تخفیف در همه فروشگاه‌ها',
    'rank.nightstar.f3': '۱۰x جایزه روزانه',
    'rank.nightstar.f4': 'عنوان انحصاری NightStar',
    'rank.nightstar.f5': 'اعلانات اختصاصی سرور',
    'rank.nightstar.f6': 'تمام ویژگی‌های قبلی',

    // Gift Code
    'gift.eyebrow': 'کد هدیه',
    'gift.title': 'کد هدیه‌ات را دریافت کن',
    'gift.sub': 'کد هدیه خود را وارد کن تا جایزه انحصاری‌ات را بگیری',
    'gift.username': 'نام کاربری ماینکرفت',
    'gift.username.ph': 'نام کاربری‌ات را وارد کن',
    'gift.code': 'کد هدیه',
    'gift.code.ph': 'کد هدیه‌ات را وارد کن',
    'gift.btn': 'دریافت کد',
    'gift.success': 'کد هدیه با موفقیت دریافت شد! صندوق ورودی بازی‌ات را بررسی کن.',
    'gift.error': 'کد هدیه نامعتبر یا منقضی شده است. دوباره تلاش کن.',

    // Vote
    'vote.eyebrow': 'رای',
    'vote.title': 'حمایت و رای‌گیری',
    'vote.sub': 'هر روز رای بده تا جوایز انحصاری کسب کنی',
    'vote.btn': 'الان رای بده',
    'vote.rewards.title': 'جوایز رای',
    'vote.rewards.sub': 'هر رای جوایز فوق‌العاده‌ای برای تو دارد!',
    'vote.r1': '۱۰۰ امتیاز',
    'vote.r2': 'جعبه مرموز',
    'vote.r3': 'کلید جعبه رای',
    'vote.r4': 'افزایش XP ۱ساعته',
    'vote.r5': 'سکه بونوس',

    // Rules
    'rules.eyebrow': 'قوانین',
    'rules.title': 'قوانین سرور',
    'rules.sub': 'قوانین را بخوان و رعایت کن تا XDify برای همه سرگرم‌کننده باشه',
    'rules.chat.title': 'قوانین چت',
    'rules.gameplay.title': 'قوانین بازی',
    'rules.punishments.title': 'مجازات‌ها',
    'rules.fairplay.title': 'بازی منصفانه',

    // Support
    'support.eyebrow': 'پشتیبانی',
    'support.title': 'نیاز به کمک داری؟',
    'support.sub': 'تیم ما ۲۴/۷ آماده کمک به شماست',
    'support.discord.title': 'پشتیبانی دیسکورد',
    'support.discord.desc': 'در سرور دیسکورد ما کمک فوری دریافت کن',
    'support.ticket.title': 'باز کردن تیکت',
    'support.ticket.desc': 'برای مشکلات حساب یا پرداخت تیکت باز کن',
    'support.email.title': 'ایمیل به ما',
    'support.email.desc': 'برای سوالات تفصیلی ایمیل بفرستید',
    'support.form.title': 'ارسال پیام',
    'support.form.name': 'نام شما',
    'support.form.name.ph': 'نامت را وارد کن',
    'support.form.email': 'آدرس ایمیل',
    'support.form.email.ph': 'your@email.com',
    'support.form.subject': 'موضوع',
    'support.form.subject.ph': 'مشکل شما در مورد چیست؟',
    'support.form.msg': 'پیام',
    'support.form.msg.ph': 'مشکل خود را با جزئیات توضیح بده...',
    'support.form.send': 'ارسال پیام',
    'support.form.sent': 'پیام ارسال شد! ظرف ۲۴ ساعت پاسخ می‌دهیم.',
    'faq.title': 'سوالات متداول',
    'faq.eyebrow': 'سوالات',

    // Footer
    'footer.desc': 'بهترین تجربه سرور ماینکرفت نسخه جاوا. به هزاران بازیکن در سراسر جهان بپیوند.',
    'footer.links': 'لینک‌های سریع',
    'footer.social': 'دنبال کن',
    'footer.legal': 'حقوقی',
    'footer.copyright': '© ۲۰۲۴ XDify. تمامی حقوق محفوظ است.',
    'footer.privacy': 'حریم خصوصی',
    'footer.terms': 'شرایط استفاده',
    'footer.refund': 'سیاست بازپرداخت',
  }
};

const LanguageManager = {
  storageKey: 'xdify-lang',
  
  get() {
    return localStorage.getItem(this.storageKey) || 'en';
  },
  
  set(lang) {
    localStorage.setItem(this.storageKey, lang);
    document.documentElement.setAttribute('lang', lang);
    document.body.classList.toggle('rtl', lang === 'fa');
    this.apply(lang);
    this.updateSwitcher(lang);
  },
  
  t(key) {
    const lang = this.get();
    return (translations[lang] && translations[lang][key]) || 
           (translations['en'] && translations['en'][key]) || 
           key;
  },
  
  apply(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = (translations[lang] && translations[lang][key]) || 
                   (translations['en'] && translations['en'][key]) || key;
      el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      const text = (translations[lang] && translations[lang][key]) || 
                   (translations['en'] && translations['en'][key]) || key;
      el.placeholder = text;
    });
  },
  
  updateSwitcher(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  },
  
  toggle() {
    this.set(this.get() === 'en' ? 'fa' : 'en');
  },
  
  init() {
    const saved = this.get();
    document.documentElement.setAttribute('lang', saved);
    document.body.classList.toggle('rtl', saved === 'fa');
    this.apply(saved);
    this.updateSwitcher(saved);
  }
};