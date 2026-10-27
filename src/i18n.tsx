import React, { createContext, useContext, useEffect, useState } from 'react';

export const LANGUAGES = ['ky', 'en', 'ru'] as const;
export type Lang = (typeof LANGUAGES)[number];

export interface LocalizedText {
  en: string;
  ky: string;
  ru: string;
}

export const L = (en: string, ky: string, ru: string): LocalizedText => ({ en, ky, ru });
export const pickLang = (text: LocalizedText, lang: Lang): string => text[lang] ?? text.en;

const en = {
  nav: {
    home: 'Home',
    about: 'About',
    stay: 'Stay',
    tours: 'Horse Tours',
    experiences: 'Experiences',
    gallery: 'Gallery',
    location: 'Getting Here',
    contact: 'Contact',
    visit: 'Plan Your Visit',
    book: 'Book Your Stay',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    overline: 'Kyzart Village · Naryn Region · Kyrgyzstan',
    titleA: 'Discover Authentic',
    titleB: 'Kyrgyz Hospitality',
    titleC: 'in Kyzart',
    subtitle:
      'Your cozy mountain guesthouse and gateway to the unforgettable landscapes of Son-Kul Lake.',
    book: 'Book Your Stay',
    tours: 'Explore Horseback Riding Tours',
    whatsapp: 'Chat on WhatsApp',
    scroll: 'Scroll to explore',
  },
  intro: {
    label: 'Welcome',
    title: 'A family guesthouse on the road to Son-Kul',
    p1: 'Between the green ridges of the Naryn region lies Kyzart — a quiet Kyrgyz village where travelers rest, eat well and saddle up for the high pastures. Our guesthouse is a real family home: simple, warm and open to guests from all over the world.',
    p2: 'Come for a night before your trek, or stay a while and let village life slow you down.',
    f1t: 'Family Hospitality',
    f1d: 'Welcomed the Kyrgyz way — with hot tea, fresh bread and a seat by the stove.',
    f2t: 'Gateway to Son-Kul',
    f2d: 'Kyzart is the classic trailhead for horseback routes over the passes to Son-Kul Lake.',
    f3t: 'Rest & Quiet',
    f3d: 'Thick blankets, homemade food and silent, starry nights high in the mountains.',
  },
  marquee: [
    'Yurt stays',
    'Horseback trails',
    'Nomad culture',
    'Homemade food',
    'Mountain air',
    'Son-Kul Lake',
  ],
  about: {
    label: 'About Us',
    title: 'Slow days, warm bread and mountain air',
    p1: 'Kyzart is a small mountain village where life still follows the seasons. In summer, families take their animals to the high jailoo pastures; in the evenings, the smell of fresh bread drifts down the lane and horses doze by the fence.',
    p2: 'Our guesthouse opens its doors to travelers who want to experience this rhythm — not as spectators, but as guests. Share a pot of tea, watch the herds come home, and fall asleep under a roof of stars.',
    c1: 'Homemade meals from the family kitchen',
    c2: 'Quiet village nights & starry skies',
    c3: 'Local tips for trails and transport',
    c4: 'A comfortable base for Son-Kul adventures',
    quote: 'When a guest arrives, fortune arrives with them.',
    quoteBy: 'Kyrgyz proverb',
    noteTitle: 'A note for the owner',
    noteText:
      'This is placeholder storytelling. Replace it with your own: who your family is, how you started welcoming travelers, and what makes your home special. Guests love knowing who will greet them.',
  },
  rooms: {
    label: 'Accommodation',
    title: 'Rooms & yurt stays',
    intro:
      'Simple, clean and genuinely local. Prices, amenities and availability below are editable placeholders — everything is confirmed personally with your host before booking.',
    banner:
      'No online payment needed — send an inquiry and the host confirms availability, final prices and details directly with you in chat.',
    sleeps: 'Sleeps up to',
    guests: 'guests',
    perNight: 'per night',
    onRequest: 'Price on request',
    inquire: 'Inquire via WhatsApp',
    legendSolid: 'included / confirmed',
    legendDashed: 'to be confirmed with the host',
  },
  tours: {
    label: 'Horseback Riding to Son-Kul Lake',
    title: 'Ride the nomad trail',
    titleItalic: 'to Son-Kul Lake',
    intro:
      'For centuries, Kyrgyz nomads have crossed these passes to reach the summer pastures of Son-Kul. From our door in Kyzart you can ride the same trails — with a local horseman as your guide.',
    duration: 'Duration',
    level: 'Level',
    season: 'Season',
    price: 'Price',
    tbc: 'To be confirmed',
    itinerary: 'Sample itinerary',
    itineraryNote:
      'Exact itineraries, inclusions, prices and departure dates are subject to confirmation.',
    includes: 'What a tour may include',
    includesNote: 'Final inclusions are confirmed in chat when you book.',
    ridersTitle: 'Beginners welcome, riders at home',
    ridersText:
      'Never ridden before? Calm local horses and experienced guides make the trail friendly for first-timers — while multi-day routes keep experienced riders happy.',
    routeTitle: 'The classic Kyzart → Son-Kul trail',
    routeNote: 'Sample route — subject to weather and confirmation',
    cta: 'Ask About a Tour',
  },
  exp: {
    label: 'Experiences',
    title: 'Days shaped by the mountains',
    intro:
      'Everything below may be arranged with your host. Availability is seasonal and always confirmed in person before your arrival.',
    available: 'Available',
    seasonal: 'Seasonal',
    'on-request': 'On request',
  },
  gallery: {
    label: 'Gallery',
    title: 'Moments from the jailoo',
    intro:
      'Accommodation, horses, mountains, yurts, food and quiet village life — tap any photo to view it larger.',
    open: 'Open photo',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
  },
  loc: {
    label: 'Location & How to Get Here',
    title: 'Find us in the Naryn mountains',
    intro:
      'Our guesthouse is located at Чунгулав көчөсү 5а, Kyzart Village, Jumgal District, Naryn Region, Kyrgyzstan — on the classic overland route between Bishkek, Kochkor and Son-Kul Lake.',
    mapTitle: 'Чунгулав көчөсү 5а · Kyzart Village',
    mapText:
      'Interactive map of Kyzart village in Jumgal District, Naryn Region. Message us on WhatsApp if you need directions or a local pickup.',
    mapOpen: 'Open in Google Maps',
    mapAsk: 'Ask for pickup on WhatsApp',
    travelTitle: 'Getting here',
    travelNote:
      'Travel times and transport schedules can vary by season. Your host can help arrange a pickup — just message us on WhatsApp.',
    placeholder: 'placeholder',
  },
  contact: {
    label: 'Contact & Booking',
    title: 'Plan your stay in Kyzart',
    intro:
      'The fastest way to reach us is WhatsApp — or send an inquiry below and we will get back to you personally.',
    whatsapp: 'WhatsApp (fastest)',
    phone: 'Phone',
    address: 'Address',
    email: 'Email',
    placeholderTag: 'placeholder — update your details',
    formTitle: 'Send a booking inquiry',
    name: 'Your name',
    namePh: 'e.g. Anna Smith',
    emailOptional: 'Email (optional)',
    emailPh: 'you@example.com',
    arrival: 'Arrival date',
    departure: 'Departure date',
    guestsLabel: 'Number of guests',
    room: 'Room preference',
    roomAny: 'No preference — advise me',
    message: 'Message (optional)',
    messagePh: 'Anything we should know? Arrival time, diet, children…',
    submit: 'Prepare Inquiry',
    errName: 'Please enter your name.',
    errArrival: 'Please choose an arrival date.',
    errDeparture: 'Please choose a departure date.',
    errDates: 'Departure must be after arrival.',
    errGuests: 'Between 1 and 12 guests.',
    errEmail: 'Please enter a valid email or leave it empty.',
    successTitle: 'Your inquiry is ready!',
    successDemo:
      'Front-end demo: no backend is connected yet, so nothing was sent. Connect a form service (e.g. Formspree or a small API) to deliver inquiries automatically — or send this exact inquiry via WhatsApp right now:',
    successCta: 'Send via WhatsApp',
    successEdit: '← Edit inquiry',
    sumDates: 'Dates',
    sumGuests: 'Guests',
    sumRoom: 'Room',
    sumName: 'Name',
    trust1: 'Direct booking — no platform fees',
    trust2: 'Personal reply from your host',
    trust3: 'Free cancellation policy to be defined by owner',
  },
  foot: {
    tagline:
      'A family guesthouse in Kyzart village, Naryn Region — your cozy base for Son-Kul Lake and the mountains of Kyrgyzstan.',
    explore: 'Explore',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
    madeIn: 'Made with care in the Naryn mountains',
    language: 'Language',
    note: 'Contact details shown are placeholders — replace them in the site configuration.',
  },
  float: {
    label: 'Chat with us on WhatsApp',
  },
  common: {
    langName: 'Русский',
    skip: 'Go to',
    badge: 'Gateway to Son-Kul',
  },
  pages: {
    stay: {
      eyebrow: 'Accommodation',
      title: 'A warm bed at the edge of the',
      italic: 'mountains',
      intro:
        'Simple rooms, a traditional yurt and space to rest after the trail. Everything is arranged personally with your host — no booking platforms, no hidden extras.',
    },
    tours: {
      eyebrow: 'Horseback riding',
      title: 'Horseback adventures from',
      italic: 'Kyzart village',
      intro:
        'Two-day escapes and multi-day journeys across high passes and summer pastures, guided by local horsemen from Kyzart village.',
    },
    visit: {
      eyebrow: 'Plan your journey',
      title: 'Find your way to',
      italic: 'Kyzart village',
      intro:
        'Everything you need for the road ahead — travel notes from Bishkek, an interactive map of Kyzart village, and a booking inquiry form that reaches your host directly.',
    },
    seo: {
      home: {
        title: 'Kyzart Village Guesthouse — Authentic Kyrgyz Hospitality near Son-Kul Lake',
        desc: 'Family-run guesthouse in Kyzart village, Naryn Region, Kyrgyzstan. Cozy rooms, homemade Kyrgyz food and guided horseback riding tours to Son-Kul Lake. Book directly via WhatsApp.',
      },
      stay: {
        title: 'Accommodation in Kyzart — Rooms & Yurt Stays near Son-Kul Lake',
        desc: 'Cozy guest rooms and a traditional yurt in Kyzart village, Naryn Region. View amenities, prices on request and inquire directly via WhatsApp.',
      },
      tours: {
        title: 'Horseback Riding Tours to Son-Kul Lake from Kyzart',
        desc: 'Ride from Kyzart to Son-Kul Lake with local horsemen. Two-day and multi-day tours for beginners and experienced riders. Ask about dates and prices.',
      },
      visit: {
        title: 'Getting to Kyzart Village & Booking — Naryn Region Guesthouse',
        desc: 'How to reach Kyzart village from Bishkek, Kochkor or Son-Kul, plus direct booking inquiries via WhatsApp and our inquiry form.',
      },
    },
  },
  journey: {
    label: 'Your journey',
    title: 'Three ways to experience',
    italic: 'Kyzart',
    intro:
      'Stay a night in the family house, ride to Son-Kul with a local horseman, or plan the road that brings you here.',
    cards: {
      stay: {
        title: 'Stay with us',
        text: 'Guest rooms and a traditional yurt, with home-cooked meals and mountain quiet.',
        cta: 'View accommodation',
        alt: 'Cozy guest room with Kyrgyz textiles',
      },
      tours: {
        title: 'Ride to Son-Kul',
        text: 'Guided trails over the passes, nights in shepherd yurts and a lake that stops time.',
        cta: 'Explore horse tours',
        alt: 'Horseman crossing a green mountain pass',
      },
      visit: {
        title: 'Plan your visit',
        text: 'Route notes, an interactive map and a direct booking inquiry form for your host.',
        cta: 'Getting here & booking',
        alt: 'Kyzart village beneath the mountains',
      },
    },
    bandTitle: 'Your mountain stay starts with a message',
    bandText:
      'No booking platforms — write to your host directly and we will help with rooms, horses and the road ahead.',
  },
  breadcrumb: {
    home: 'Home',
    aria: 'Breadcrumb',
  },
};

export type Translations = typeof en;

const ru: Translations = {
  nav: {
    home: 'Главная',
    about: 'О нас',
    stay: 'Размещение',
    tours: 'Конные туры',
    experiences: 'Впечатления',
    gallery: 'Галерея',
    location: 'Как добраться',
    contact: 'Контакты',
    visit: 'Спланировать визит',
    book: 'Забронировать',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
  },
  hero: {
    overline: 'Село Кызарт · Нарынская область · Кыргызстан',
    titleA: 'Откройте для себя',
    titleB: 'настоящее кыргызское',
    titleC: 'гостеприимство в Кызарте',
    subtitle: 'Ваш уютный горный гостевой дом и ворота к незабываемым пейзажам озера Сон-Куль.',
    book: 'Забронировать проживание',
    tours: 'Конные туры к Сон-Кулю',
    whatsapp: 'Написать в WhatsApp',
    scroll: 'Листайте вниз',
  },
  intro: {
    label: 'Добро пожаловать',
    title: 'Семейный гостевой дом на пути к Сон-Кулю',
    p1: 'Между зелёными хребтами Нарынской области лежит Кызарт — тихое кыргызское село, где путешественники отдыхают, вкусно едят и седлают коней перед высокими пастбищами. Наш гостевой дом — настоящий семейный дом: простой, тёплый и открытый гостям со всего мира.',
    p2: 'Заезжайте на ночь перед походом или останьтесь подольше — деревенская жизнь замедлит ваш шаг.',
    f1t: 'Семейное гостеприимство',
    f1d: 'Встречаем по-кыргызски: горячий чай, свежий хлеб и место у тёплой печки.',
    f2t: 'Ворота к Сон-Кулю',
    f2d: 'Кызарт — классическая отправная точка конных маршрутов через перевалы к озеру Сон-Куль.',
    f3t: 'Отдых и тишина',
    f3d: 'Толстые одеяла, домашняя еда и тихие звёздные ночи высоко в горах.',
  },
  marquee: [
    'Ночёвки в юртах',
    'Конные тропы',
    'Кочевая культура',
    'Домашняя еда',
    'Горный воздух',
    'Озеро Сон-Куль',
  ],
  about: {
    label: 'О нас',
    title: 'Неспешные дни, тёплый хлеб и горный воздух',
    p1: 'Кызарт — небольшое горное село, где жизнь по-прежнему следует за временами года. Летом семьи угоняют скот на высокие пастбища джайлоо, а по вечерам вдоль улицы плывёт запах свежего хлеба, и лошади дремлют у забора.',
    p2: 'Наш гостевой дом открыт для путешественников, которые хотят почувствовать этот ритм — не зрителями, а гостями. Разделите с нами чайник горячего чая, понаблюдайте, как стада возвращаются домой, и засните под крышей из звёзд.',
    c1: 'Домашние блюда из семейной кухни',
    c2: 'Тихие деревенские ночи и звёздное небо',
    c3: 'Местные советы по тропам и транспорту',
    c4: 'Удобная база для приключений на Сон-Куле',
    quote: 'Пришёл гость — пришло и счастье.',
    quoteBy: 'кыргызская пословица',
    noteTitle: 'Заметка для владельца',
    noteText:
      'Это текст-заглушка. Замените его своей историей: кто ваша семья, как вы начали принимать путешественников и что делает ваш дом особенным. Гостям важно знать, кто их встретит.',
  },
  rooms: {
    label: 'Размещение',
    title: 'Комнаты и ночёвки в юрте',
    intro:
      'Просто, чисто и по-настоящему местное. Цены, удобства и доступность ниже — редактируемые заглушки; всё окончательно подтверждается лично с хозяином до бронирования.',
    banner:
      'Онлайн-оплата не нужна — отправьте запрос, и хозяин подтвердит наличие мест, итоговые цены и детали прямо с вами в чате.',
    sleeps: 'До',
    guests: 'гостей',
    perNight: 'за ночь',
    onRequest: 'Цена по запросу',
    inquire: 'Запросить в WhatsApp',
    legendSolid: 'включено / подтверждено',
    legendDashed: 'уточняется у хозяина',
  },
  tours: {
    label: 'Конные туры к озеру Сон-Куль',
    title: 'По тропам кочевников',
    titleItalic: 'к Сон-Кулю',
    intro:
      'Веками кыргызские кочевники переходили эти перевалы к летним пастбищам Сон-Куля. От нашей двери в Кызарте вы можете проехать те же тропы — с местным егерем в качестве проводника.',
    duration: 'Длительность',
    level: 'Уровень',
    season: 'Сезон',
    price: 'Цена',
    tbc: 'Уточняется',
    itinerary: 'Примерная программа',
    itineraryNote: 'Точная программа, включения, цены и даты выезда подлежат подтверждению.',
    includes: 'Что может входить в тур',
    includesNote: 'Окончательный список подтверждается в чате при бронировании.',
    ridersTitle: 'Новичкам — добро пожаловать, наездникам — простор',
    ridersText:
      'Никогда не сидели в седле? Спокойные местные лошади и опытные проводники делают маршрут дружелюбным к новичкам, а многодневные треки порадуют опытных всадников.',
    routeTitle: 'Классическая тропа Кызарт → Сон-Куль',
    routeNote: 'Примерный маршрут — зависит от погоды и подтверждения',
    cta: 'Спросить о туре',
  },
  exp: {
    label: 'Впечатления',
    title: 'Дни, которые создают горы',
    intro:
      'Всё нижеперечисленное можно организовать с хозяином. Доступность зависит от сезона и всегда подтверждается лично до вашего приезда.',
    available: 'Доступно',
    seasonal: 'Сезонно',
    'on-request': 'По запросу',
  },
  gallery: {
    label: 'Галерея',
    title: 'Мгновения с джайлоо',
    intro: 'Жильё, лошади, горы, юрты, еда и тихая деревенская жизнь — нажмите на фото, чтобы увеличить.',
    open: 'Открыть фото',
    close: 'Закрыть',
    prev: 'Предыдущее фото',
    next: 'Следующее фото',
  },
  loc: {
    label: 'Расположение и маршрут',
    title: 'Найдите нас в Нарынских горах',
    intro:
      'Наш гостевой дом находится по адресу: Чунгулав көчөсү 5а, Кызарт айылы, Жумгал району, Нарын облусу, Кыргызстан — на классическом маршруте между Бишкеком, Кочкором и озером Сон-Куль.',
    mapTitle: 'Чунгулав көчөсү 5а · Кызарт айылы',
    mapText:
      'На интерактивной карте — село Кызарт в Жумгальском районе Нарынской области. Напишите нам в WhatsApp, если нужна помощь с дорогой или трансфером.',
    mapOpen: 'Открыть в Google Maps',
    mapAsk: 'Связаться в WhatsApp',
    travelTitle: 'Как добраться',
    travelNote:
      'Время в пути и расписание транспорта уточняйте перед поездкой. Хозяин также поможет организовать встречу — напишите в WhatsApp.',
    placeholder: 'заглушка',
  },
  contact: {
    label: 'Контакты и бронирование',
    title: 'Спланируйте отдых в Кызарте',
    intro: 'Быстрее всего написать нам в WhatsApp — либо отправьте запрос ниже, и мы ответим вам лично.',
    whatsapp: 'WhatsApp (быстрее всего)',
    phone: 'Телефон',
    address: 'Адрес',
    email: 'Эл. почта',
    placeholderTag: 'заглушка — обновите свои данные',
    formTitle: 'Отправить запрос на бронирование',
    name: 'Ваше имя',
    namePh: 'например, Анна Смирнова',
    emailOptional: 'Эл. почта (необязательно)',
    emailPh: 'you@example.com',
    arrival: 'Дата заезда',
    departure: 'Дата выезда',
    guestsLabel: 'Количество гостей',
    room: 'Предпочтения по комнате',
    roomAny: 'Без предпочтений — посоветуйте',
    message: 'Сообщение (необязательно)',
    messagePh: 'Что нам стоит знать? Время прибытия, питание, дети…',
    submit: 'Подготовить запрос',
    errName: 'Пожалуйста, укажите ваше имя.',
    errArrival: 'Пожалуйста, выберите дату заезда.',
    errDeparture: 'Пожалуйста, выберите дату выезда.',
    errDates: 'Выезд должен быть позже заезда.',
    errGuests: 'От 1 до 12 гостей.',
    errEmail: 'Введите корректный email или оставьте поле пустым.',
    successTitle: 'Ваш запрос готов!',
    successDemo:
      'Демонстрация без сервера: ничего не было отправлено. Подключите сервис форм (например, Formspree или небольшое API), чтобы запросы приходили автоматически, — или отправьте этот запрос прямо сейчас через WhatsApp:',
    successCta: 'Отправить через WhatsApp',
    successEdit: '← Изменить запрос',
    sumDates: 'Даты',
    sumGuests: 'Гости',
    sumRoom: 'Комната',
    sumName: 'Имя',
    trust1: 'Прямое бронирование — без комиссий платформ',
    trust2: 'Личный ответ от хозяина',
    trust3: 'Политику отмены определяет владелец',
  },
  foot: {
    tagline:
      'Семейный гостевой дом в селе Кызарт, Нарынская область — уютная база для поездок на озеро Сон-Куль и в горы Кыргызстана.',
    explore: 'Разделы',
    contactTitle: 'Контакты',
    rights: 'Все права защищены.',
    madeIn: 'Сделано с любовью в Нарынских горах',
    language: 'Язык',
    note: 'Показанные контакты — заглушки; замените их в конфигурации сайта.',
  },
  float: {
    label: 'Напишите нам в WhatsApp',
  },
  common: {
    langName: 'English',
    skip: 'Перейти к',
    badge: 'Ворота к Сон-Кулю',
  },
  pages: {
    stay: {
      eyebrow: 'Размещение',
      title: 'Тёплая кровать у подножия',
      italic: 'гор',
      intro:
        'Простые комнаты, традиционная юрта и место для отдыха после маршрута. Всё организуется лично с хозяином — без платформ бронирования и скрытых доплат.',
    },
    tours: {
      eyebrow: 'Верховая езда',
      title: 'Конные приключения из',
      italic: 'Кызарта',
      intro:
        'Двухдневные и многодневные путешествия через перевалы и летние пастбища с местными наездниками из села Кызарт.',
    },
    visit: {
      eyebrow: 'Спланируйте визит',
      title: 'Найдите дорогу в',
      italic: 'Кызарт',
      intro:
        'Всё для дороги: заметки о маршруте из Бишкека, интерактивная карта села Кызарт и форма запроса, которая попадает напрямую к хозяину.',
    },
    seo: {
      home: {
        title: 'Гостевой дом в Кызарте — аутентичное кыргызское гостеприимство у Сон-Куля',
        desc: 'Семейный гостевой дом в селе Кызарт, Нарынская область, Кыргызстан. Уютные комнаты, домашняя кыргызская еда и конные туры к озеру Сон-Куль. Бронируйте напрямую через WhatsApp.',
      },
      stay: {
        title: 'Размещение в Кызарте — комнаты и юрта у озера Сон-Куль',
        desc: 'Уютные гостевые комнаты и традиционная юрта в селе Кызарт, Нарынская область. Удобства, цены по запросу и прямой запрос через WhatsApp.',
      },
      tours: {
        title: 'Конные туры из Кызарта к озеру Сон-Куль',
        desc: 'Верхом из Кызарта к Сон-Кулю с местными наездниками. Двухдневные и многодневные туры для новичков и опытных всадников. Узнайте даты и цены.',
      },
      visit: {
        title: 'Как добраться в Кызарт и забронировать — гостевой дом в Нарынской области',
        desc: 'Дорога в село Кызарт из Бишкека, Кочкора или с Сон-Куля, а также прямое бронирование через WhatsApp и форму запроса.',
      },
    },
  },
  journey: {
    label: 'Ваше путешествие',
    title: 'Три пути к',
    italic: 'Кызарту',
    intro:
      'Остановитесь на ночь в семейном доме, отправьтесь верхом на Сон-Куль с местным наездником или спланируйте дорогу, которая приведёт вас сюда.',
    cards: {
      stay: {
        title: 'Остановитесь у нас',
        text: 'Гостевые комнаты и традиционная юрта, домашняя еда и горная тишина.',
        cta: 'Смотреть размещение',
        alt: 'Уютная гостевая комната с кыргызским текстилем',
      },
      tours: {
        title: 'Верхом на Сон-Куль',
        text: 'Маршруты через перевалы с ночёвками в юртах пастухов и озеро, которое останавливает время.',
        cta: 'Смотреть конные туры',
        alt: 'Всадник на зелёном горном перевале',
      },
      visit: {
        title: 'Спланируйте визит',
        text: 'Заметки о маршруте, интерактивная карта и форма прямого запроса хозяину.',
        cta: 'Как добраться и бронирование',
        alt: 'Село Кызарт у подножия гор',
      },
    },
    bandTitle: 'Ваш отдых в горах начинается с сообщения',
    bandText:
      'Без платформ бронирования — напишите хозяину напрямую, и мы поможем с комнатами, лошадьми и дорогой.',
  },
  breadcrumb: {
    home: 'Главная',
    aria: 'Навигационная цепочка',
  },
};

const ky: Translations = {
  nav: {
    home: 'Башкы бет',
    about: 'Биз жөнүндө',
    stay: 'Жайгашуу',
    tours: 'Ат турлары',
    experiences: 'Окуялар',
    gallery: 'Галерея',
    location: 'Кантип жетүү',
    contact: 'Байланыш',
    visit: 'Келүүнү пландоо',
    book: 'Орун брондоо',
    openMenu: 'Менюну ачуу',
    closeMenu: 'Менюну жабуу',
  },
  hero: {
    overline: 'Кызарт айылы · Нарын облусу · Кыргызстан',
    titleA: 'Кызарт айылынын',
    titleB: 'мейман достугун',
    titleC: 'корунуз',
    subtitle: 'Соң-Көлдүн унутулгус пейзаждарына жол ачкан жайлуу тоо конок үйүңүз.',
    book: 'Жайгашууну брондоо',
    tours: 'Атчан турларды көрүү',
    whatsapp: 'WhatsApp аркылуу жазуу',
    scroll: 'Ылдый жылдырыңыз',
  },
  intro: {
    label: 'Кош келиңиз',
    title: 'Соң-Көлгө бараткан жолдогу үй-бүлөлүк конок үй',
    p1: 'Нарын облусунун жашыл кырка тоолорунун ортосунда Кызарт жатат — саякатчылар эс алып, даамдуу тамактанып, бийик жайыттарга аттанган тынч кыргыз айылы. Биздин конок үй — чыныгы үй-бүлөнүн үйү: жөнөкөй, жылуу жана дүйнөнүн бардык булуңунан келген конокторго ачык.',
    p2: 'Трекиңиздин алдында бир түнөп кетиңиз же бир аз убакытка токтоп, айыл турмушунун ыргагына ээрчиңиз.',
    f1t: 'Үй-бүлөлүк меймандостук',
    f1d: 'Кыргызча тосуп алуу — ысык чай, жаңы нан жана мештин жанынан орун.',
    f2t: 'Соң-Көлгө дарбаза',
    f2d: 'Кызарт — Соң-Көлгө ашуулар аркылуу атчан маршруттардын классикалык башталышы.',
    f3t: 'Эс алуу жана тынчтык',
    f3d: 'Калың жууркандар, үй тамагы жана тоолордогу тынч, жылдыздуу түндөр.',
  },
  marquee: ['Юртада түнөө', 'Атчан жолдор', 'Көчмөн маданияты', 'Үй тамагы', 'Тоо абасы', 'Соң-Көл'],
  about: {
    label: 'Биз жөнүндө',
    title: 'Ашыкпаган күндөр, жылуу нан жана тоо абасы',
    p1: 'Кызарт — турмуш дагы эле мезгилдерге баш ийген кичинекей тоо айылы. Жайында үй-бүлөлөр малдарын бийик жайлоого айдашат; кечинде көчөдөн жаңы нандын жыты келип, аттар дарбазанын жанында тыным алышат.',
    p2: 'Биздин конок үй бул ыргакты сезип келген саякатчыларга эшигин ачат — күбө болуу үчүн эмес, конок болуу үчүн. Бир чайнек чайды бөлүшүңүз, үйүрлөрдүн кайтканын көрүңүз жана жылдыздардын астында уктаңыз.',
    c1: 'Үй-бүлөлүк ашканадан даярдалган тамактар',
    c2: 'Тынч айылдык түндөр жана жылдыздуу асман',
    c3: 'Жолдор жана транспорт боюнча жергиликтүү кеңештер',
    c4: 'Соң-Көл окуялары үчүн ыңгайлуу база',
    quote: 'Келген конок — келген ырыс.',
    quoteBy: 'кыргыз макалы',
    noteTitle: 'Ээсине эскертүү',
    noteText:
      'Бул — үлгү текст. Аны өзүңүздүн окуяңыз менен алмаштырыңыз: үй-бүлөңүз ким, саякатчыларды кантип тосуп ала баштаганыңыз жана үйүңүздү эмне өзгөчө кылганы тууралуу. Коноктор аларды ким тосуп аларын билүүнү жакшы көрүшөт.',
  },
  rooms: {
    label: 'Жайгашуу',
    title: 'Бөлмөлөр жана юртада түнөө',
    intro:
      'Жөнөкөй, таза жана чыныгы жергиликтүү. Төмөнкү баалар, ыңгайлуулуктар жана жеткиликтүүлүк — оңдоп-түзөтүлүүчү үлгүлөр; баары брондоодон мурун ээси менен жеке такталат.',
    banner:
      'Онлайн төлөм талап кылынбайт — суроо жөнөтүңүз, ээси орундардын бар-жогун, акыркы бааларды жана деталдарды чатта түз сиз менен тактайт.',
    sleeps: 'Эң көп',
    guests: 'конок',
    perNight: 'түнүнө',
    onRequest: 'Баасы суроо боюнча',
    inquire: 'WhatsApp аркылуу суроо',
    legendSolid: 'киргизилген / ырасталган',
    legendDashed: 'ээси менен такталат',
  },
  tours: {
    label: 'Соң-Көлгө атчан турлар',
    title: 'Көчмөн жолу менен аттануу',
    titleItalic: 'Соң-Көлгө',
    intro:
      'Кылымдар бою кыргыз көчмөндөрү Соң-Көлдүн жайкы жайыттарына жетүү үчүн ушул ашуулардан ашкан. Кызарттагы эшигибизден сиз да ошол эле жолдор менен ат минип, жергиликтүү атчыны жол көрсөтүүчү катары ала аласыз.',
    duration: 'Узактыгы',
    level: 'Деңгээли',
    season: 'Сезону',
    price: 'Баасы',
    tbc: 'Такталат',
    itinerary: 'Үлгү программа',
    itineraryNote: 'Так программа, киргизилген кызматтар, баалар жана чыгуу күндөрү такталууга жатат.',
    includes: 'Турга эмнелер кириши мүмкүн',
    includesNote: 'Акыркы тизме брондоодо чатта такталат.',
    ridersTitle: 'Жаңы баштагандарга — кош келиңиз, атчандарга — кенен жол',
    ridersText:
      'Мурда ат минип көрбөдүңүзбү? Тынч жергиликтүү аттар жана тажрыйбалуу жол көрсөтүүчүлөр жолду жаңы баштагандарга ыңгайлуу кылат, ал эми көп күндүк маршруттар тажрыйбалуу атчандарды кубандырат.',
    routeTitle: 'Классикалык Кызарт → Соң-Көл жолу',
    routeNote: 'Үлгү маршрут — аба ырайына жараша жана такталат',
    cta: 'Тур тууралуу суроо',
  },
  exp: {
    label: 'Окуялар',
    title: 'Тоолор тартуулаган күндөр',
    intro:
      'Төмөнкүлөрдүн баарын ээси менен уюштурууга болот. Жеткиликтүүлүк сезонго жараша болот жана келүүңүздөн мурун ар дайым жеке такталат.',
    available: 'Жеткиликтүү',
    seasonal: 'Сезондук',
    'on-request': 'Суроо боюнча',
  },
  gallery: {
    label: 'Галерея',
    title: 'Жайлоодон алынган учурлар',
    intro: 'Жайгашуу, аттар, тоолор, юрталар, тамак жана тынч айыл турмушу — каалаган сүрөттү чоңойтуп көрүңүз.',
    open: 'Сүрөттү ачуу',
    close: 'Жабуу',
    prev: 'Мурунку сүрөт',
    next: 'Кийинки сүрөт',
  },
  loc: {
    label: 'Жайгашкан жери жана кантип жетүү',
    title: 'Бизди Нарын тоолорунан табыңыз',
    intro:
      'Биздин конок үй төмөнкү даректе жайгашкан: Чунгулав көчөсү 5а, Кызарт айылы, Жумгал району, Нарын облусу, Кыргызстан — Бишкек, Кочкор жана Соң-Көлдүн ортосундагы классикалык маршрутта.',
    mapTitle: 'Чунгулав көчөсү 5а · Кызарт айылы',
    mapText:
      'Интерактивдүү картада Нарын облусунун Жумгал районундагы Кызарт айылы көрсөтүлгөн. Тосуп алуу же багыт боюнча суроолор болсо, WhatsApp аркылуу жазыңыз.',
    mapOpen: 'Google Mapsтен ачуу',
    mapAsk: 'WhatsApp аркылуу байланышуу',
    travelTitle: 'Кантип жетүү керек',
    travelNote:
      'Жолго кетүү убактысы жана транспорт расписаниеси сезонго жараша өзгөрүшү мүмкүн. Ээси тосуп алууну уюштурууга жардам бере алат — WhatsAppта сураңыз.',
    placeholder: 'үлгү',
  },
  contact: {
    label: 'Байланыш жана брондоо',
    title: 'Кызарттагы эс алууну пландаңыз',
    intro:
      'Бизге эң тез жетүү жолу — WhatsApp, же төмөнкү форма аркылуу суроо жөнөтүңүз, биз жеке жооп беребиз.',
    whatsapp: 'WhatsApp (эң тез)',
    phone: 'Телефон',
    address: 'Дарек',
    email: 'Электрондук почта',
    placeholderTag: 'үлгү — маалыматты жаңыртыңыз',
    formTitle: 'Брондоо боюнча суроо жөнөтүү',
    name: 'Атыңыз',
    namePh: 'мисалы, Анна Смит',
    emailOptional: 'Электрондук почта (милдеттүү эмес)',
    emailPh: 'you@example.com',
    arrival: 'Келүү күнү',
    departure: 'Кетүү күнү',
    guestsLabel: 'Коноктордун саны',
    room: 'Бөлмө тандоо',
    roomAny: 'Айырмасы жок — сунуштаңыз',
    message: 'Билдирүү (милдеттүү эмес)',
    messagePh: 'Биз билишибиз керек болгон нерсе барбы? Келүү убактысы, тамактануу, балдар…',
    submit: 'Суроону даярдоо',
    errName: 'Атыңызды жазыңыз.',
    errArrival: 'Келүү күнүн тандаңыз.',
    errDeparture: 'Кетүү күнүн тандаңыз.',
    errDates: 'Кетүү күнү келүү күнүнөн кийин болушу керек.',
    errGuests: '1ден 12ге чейин конок.',
    errEmail: 'Туура email жазыңыз же талааны бош калтырыңыз.',
    successTitle: 'Сурооңуз даяр!',
    successDemo:
      'Фронтенд демо: сервер туташтырыла элек, ошондуктан эч нерсе жөнөтүлгөн жок. Суроолорду автоматтык жеткирүү үчүн форма кызматын (мисалы, Formspree же кичинекей API) туташтырыңыз — же ушул суроону азыр WhatsApp аркылуу жөнөтүңүз:',
    successCta: 'WhatsApp аркылуу жөнөтүү',
    successEdit: '← Суроону өзгөртүү',
    sumDates: 'Күндөрү',
    sumGuests: 'Коноктор',
    sumRoom: 'Бөлмө',
    sumName: 'Аты',
    trust1: 'Түз брондоо — платформа комиссиясыз',
    trust2: 'Ээсинен жеке жооп',
    trust3: 'Жокко чыгаруу шарттарын ээси аныктайт',
  },
  foot: {
    tagline:
      'Кызарт айылындагы үй-бүлөлүк конок үй, Нарын облусу — Соң-Көл жана Кыргызстандын тоолору үчүн жайлуу базаңыз.',
    explore: 'Бөлүмдөр',
    contactTitle: 'Байланыш',
    rights: 'Бардык укуктар корголгон.',
    madeIn: 'Нарын тоолорунда сүйүү менен жасалды',
    language: 'Тил',
    note: 'Көрсөтүлгөн байланыш маалыматтары — үлгүлөр; аларды сайттын конфигурациясында алмаштырыңыз.',
  },
  float: {
    label: 'WhatsApp аркылуу жазыңыз',
  },
  common: {
    langName: 'Кыргызча',
    skip: 'өтүү',
    badge: 'Соң-Көлгө дарбаза',
  },
  pages: {
    stay: {
      eyebrow: 'Жайгашуу',
      title: 'Тоолордун этегинде жайлуу',
      italic: 'бөлмөлөр',
      intro:
        'Жөнөкөй бөлмөлөр, салттуу юрта жана жолдон кийин эс алууга орун. Баары ээси менен жеке уюштурулат — брондоо платформалары жок, жашыруун кошумча төлөмдөр жок.',
    },
    tours: {
      eyebrow: 'Атчан саякат',
      title: 'Кызарттан башталган',
      italic: 'атчан саякат',
      intro:
        'Кызарт айылынын жергиликтүү атчылары менен бийик ашуулар жана жайкы жайыттар аркылуу эки күндүк жана көп күндүк саякаттар.',
    },
    visit: {
      eyebrow: 'Сапарыңызды пландаңыз',
      title: 'Кызарт айылына',
      italic: 'жолуңузду табыңыз',
      intro:
        'Алдыдагы жол үчүн керектүүнүн баары — Бишкектен жол эскертүүлөрү, Кызарт айылынын интерактивдүү картасы жана ээңизге түз жеткен брондоо формасы.',
    },
    seo: {
      home: {
        title: 'Кызарт конок үйү — Соң-Көлгө жакын кыргыз конокчулугу',
        desc: 'Нарын облусунун Кызарт айылындагы үй-бүлөлүк конок үй: жайлуу бөлмөлөр, үй тамагы, Соң-Көлгө атчан турлар. WhatsApp аркылуу түз брондоңуз.',
      },
      stay: {
        title: 'Кызартта жайгашуу — Соң-Көлгө жакын бөлмөлөр жана юрта',
        desc: 'Кызарт айылындагы конок бөлмөлөр жана салттуу юрта. Ыңгайлуулуктар, суроо боюнча баалар жана WhatsApp аркылуу түз суроо.',
      },
      tours: {
        title: 'Кызарттан Соң-Көлгө атчан турлар — 2 жана көп күндүк',
        desc: 'Кызарттан Соң-Көлгө жергиликтүү атчылар менен атчан турлар. Жаңы баштагандар жана тажрыйбалуу атчандар үчүн. Күндөр жана баалар боюнча сураңыз.',
      },
      visit: {
        title: 'Кызарт айылына кантип жетүү жана брондоо',
        desc: 'Бишкек, Кочкор жана Соң-Көлдөн Кызартка жол. WhatsApp жана форма аркылуу түз брондоо.',
      },
    },
  },
  journey: {
    label: 'Сапарыңыз',
    title: 'Кызартты сезүүнүн',
    italic: 'үч жолу',
    intro:
      'Үй-бүлөлүк үйдө бир түнөңүз, жергиликтүү атчы менен Соң-Көлгө аттаныңыз же бул жерге алып келген жолду пландаңыз.',
    cards: {
      stay: {
        title: 'Бизде токтоңуз',
        text: 'Үй-бүлөлүк бөлмөлөр жана салттуу юрта, үй тамагы жана тоо тынчтыгы менен.',
        cta: 'Жайгашууну көрүү',
        alt: 'Кыргыз кездемелери менен жайлуу конок бөлмөсү',
      },
      tours: {
        title: 'Соң-Көлгө аттануу',
        text: 'Ашуулар аркылуу жол көрсөтүү менен саякат, койчулардын юрталарында түнөө жана убакытты токтоткон көл.',
        cta: 'Ат турларын көрүү',
        alt: 'Жашыл тоо ашуусунан өтүп бараткан атчан',
      },
      visit: {
        title: 'Келүүңүздү пландаңыз',
        text: 'Маршрут эскертүүлөрү, интерактивдүү карта жана ээңизге түз брондоо формасы.',
        cta: 'Жол жана брондоо',
        alt: 'Тоолордун алдындагы Кызарт айылы',
      },
    },
    bandTitle: 'Тоодогу эс алууңуз бир билдирүүдөн башталат',
    bandText:
      'Брондоо платформалары жок — ээңизге түз жазыңыз, биз бөлмөлөр, аттар жана алдыдагы жол боюнча жардам беребиз.',
  },
  breadcrumb: {
    home: 'Башкы бет',
    aria: 'Навигация жолу',
  },
};

const DICTIONARIES: Record<Lang, Translations> = { en, ky, ru };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = window.localStorage.getItem('kg-lang');
    return stored === 'ky' || stored === 'ru' || stored === 'en' ? stored : 'en';
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem('kg-lang', next);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: DICTIONARIES[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useI18n = () => useContext(LanguageContext);
