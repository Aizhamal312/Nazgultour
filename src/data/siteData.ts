import { L, Lang, LocalizedText } from '../i18n';
import { RouteKey } from '../router';

export const SITE_INFO = {
  name: 'Kyzart Guesthouse',
  village: L('Kyzart Village', 'Кызарт айылы', 'село Кызарт'),
  region: L(
    'Jumgal District · Naryn Region · Kyrgyzstan',
    'Жумгал району · Нарын облусу · Кыргызстан',
    'Жумгальский район · Нарынская область · Кыргызстан',
  ),
  address: L(
    'Чунгулав көчөсү 5а, Kyzart Village, Jumgal District, Naryn Region, Kyrgyzstan',
    'Чунгулав көчөсү 5а, Кызарт айылы, Жумгал району, Нарын облусу, Кыргызстан',
    'Чунгулав көчөсү 5а, Кызарт айылы, Жумгал району, Нарын облусу, Кыргызстан',
  ),
};

export const CONTACT_CONFIG = {
  whatsappNumber: '996705554708',
  whatsappDisplay: '+996 705 554 708',
  phoneDisplay: '+996 705 554 708',
  phoneHref: 'tel:+996705554708',
};

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

const MAP_EMBED_QUERY = encodeURIComponent('Kyzart, Jumgal, Naryn Region, Kyrgyzstan');
const MAP_SEARCH_QUERY = encodeURIComponent(
  'Чунгулав көчөсү 5а, Кызарт айылы, Жумгал району, Нарын облусу, Кыргызстан',
);

export const MAP_CONFIG = {
  embedSrc: (lang: Lang) =>
    `https://www.google.com/maps?q=${MAP_EMBED_QUERY}&z=12&hl=${lang}&output=embed`,
  openUrl: `https://www.google.com/maps/search/?api=1&query=${MAP_SEARCH_QUERY}`,
};

export const WHATSAPP_TEMPLATES = {
  stay: (lang: Lang) =>
    ({
      en: 'Hello! I am interested in staying at your guesthouse in Kyzart village. Could you please share your availability, prices, and accommodation options?',
      ky: 'Саламатсыңыз! Кызарт айылындагы конок үйүңүздө токтоону каалайм. Орундардын бар-жогу, баалар жана жайгашуу варианттары тууралуу айтып бере аласызбы?',
      ru: 'Здравствуйте! Меня интересует проживание в вашем гостевом доме в селе Кызарт. Подскажите, пожалуйста, наличие мест, цены и варианты размещения?',
    })[lang],
  tour: (lang: Lang) =>
    ({
      en: 'Hello! I am interested in a horseback riding tour from Kyzart to Son-Kul Lake. Could you please share tour dates, prices, duration, and availability?',
      ky: 'Саламатсыңыз! Кызарттан Соң-Көлгө атчан турга барууну каалайм. Турдун күндөрү, баасы, узактыгы жана орундардын бар-жогу тууралуу айтып бере аласызбы?',
      ru: 'Здравствуйте! Меня интересует конный тур из Кызарта на озеро Сон-Куль. Подскажите, пожалуйста, даты туров, цены, продолжительность и наличие мест?',
    })[lang],
};

export interface RoomAmenity {
  label: LocalizedText;
  confirmed: boolean;
}

export interface RoomItem {
  id: string;
  name: LocalizedText;
  desc: LocalizedText;
  guests: number;
  img: string;
  alt: LocalizedText;
  price: number | null;
  currency: string;
  pricePer: LocalizedText;
  amenities: RoomAmenity[];
  featured?: boolean;
}

export const ROOMS: RoomItem[] = [
  {
    id: 'guest-room',
    name: L('Cozy Guest Room', 'Жайлуу конок бөлмөсү', 'Уютная комната для гостей'),
    desc: L(
      'A simple, warm room in the family guesthouse with thick blankets, Kyrgyz textiles and a view of the village against the mountains. Add your own description, photos and details here.',
      'Үй-бүлөлүк конок үйдүн жөнөкөй, жылуу бөлмөсү: калың одеялдар, кыргыз кездемелери жана тоолорго көз чаптырган айыл көрүнүшү. Бул жерге өз сүрөттөмөңүздү, сүрөттөрүңүздү жана маалыматтарыңызды кошуңуз.',
      'Простая и тёплая комната в семейном гостевом доме с толстыми одеялами, кыргызским текстилем и видом на село на фоне гор. Здесь можно добавить собственное описание, фото и детали.',
    ),
    guests: 3,
    img: '/images/room.jpg',
    alt: L(
      'Clean twin room with Kyrgyz textiles in a Kyzart guesthouse',
      'Кызарт конок үйүндөгү кыргыз кездемелери менен кооздолгон таза эки орундуу бөлмө',
      'Чистая двухместная комната с кыргызским текстилем в гостевом доме Кызарта',
    ),
    price: null,
    currency: 'USD',
    pricePer: L('per night · per room', 'түнүнө · бөлмөгө', 'за ночь · за комнату'),
    amenities: [
      {
        label: L('Warm blankets & fresh linen', 'Жылуу жууркандар жана таза төшөк', 'Тёплые одеяла и свежее бельё'),
        confirmed: true,
      },
      {
        label: L('Homemade breakfast', 'Үй завтрагы', 'Домашний завтрак'),
        confirmed: false,
      },
      {
        label: L('Hot shower', 'Ысык душ', 'Горячий душ'),
        confirmed: false,
      },
      {
        label: L('Wi-Fi', 'Wi-Fi', 'Wi-Fi'),
        confirmed: false,
      },
    ],
  },
  {
    id: 'family-room',
    name: L('Family Room', 'Үй-бүлөлүк бөлмө', 'Семейная комната'),
    desc: L(
      'A spacious room for families and small groups, with traditional shyrdak felt carpets and space to rest after a day on horseback. Add your own description, photos and details here.',
      'Үй-бүлөлөр жана кичинекей топтор үчүн кенен бөлмө: салттуу шырдактар жана ат үстүндөгү күндөн кийин эс алууга орун. Бул жерге өз сүрөттөмөңүздү, сүрөттөрүңүздү жана маалыматтарыңызды кошуңуз.',
      'Просторная комната для семей и небольших групп с традиционными войлочными коврами-шырдаками — идеальное место отдыха после дня в седле. Здесь можно добавить собственное описание, фото и детали.',
    ),
    guests: 5,
    img: '/images/interior.jpg',
    alt: L(
      'Cozy family room with shyrdak felt carpets in Kyzart guesthouse',
      'Кызарт конок үйүндөгү шырдактар менен жайлуу үй-бүлөлүк бөлмө',
      'Уютная семейная комната с войлочными коврами-шырдаками',
    ),
    price: null,
    currency: 'USD',
    pricePer: L('per night · per room', 'түнүнө · бөлмөгө', 'за ночь · за комнату'),
    amenities: [
      {
        label: L('Sleeps up to 5 guests', '5 конокко чейин', 'До 5 гостей'),
        confirmed: true,
      },
      {
        label: L('Traditional felt carpets', 'Салттуу шырдактар', 'Войлочные ковры-шырдаки'),
        confirmed: true,
      },
      {
        label: L('Heating in cold months', 'Суук айларда жылытуу', 'Отопление в холодные месяцы'),
        confirmed: false,
      },
      {
        label: L('Private bathroom', 'Жеке ванна бөлмөсү', 'Собственный санузел'),
        confirmed: false,
      },
    ],
    featured: true,
  },
  {
    id: 'yurt-stay',
    name: L('Traditional Yurt Stay', 'Салттуу юртада түнөө', 'Ночёвка в традиционной юрте'),
    desc: L(
      'Sleep like the nomads do — in a felt yurt under a canopy of stars, with layered mattresses, warm blankets and fresh mountain air. Add your own description, photos and details here.',
      'Көчмөндөрдөй уктаңыз — жылдыздуу асман алдындагы кийиз юртада, катмарлуу төшөктөр, жылуу жууркандар жана таза тоо абасы менен. Бул жерге өз сүрөттөмөңүздү, сүрөттөрүңүздү жана маалыматтарыңызды кошуңуз.',
      'Выспитесь, как кочевники, — в войлочной юрте под звёздным небом, на мягких тюках с тёплыми одеялами и свежим горным воздухом. Здесь можно добавить собственное описание, фото и детали.',
    ),
    guests: 6,
    img: '/images/yurt-interior.jpg',
    alt: L(
      'Interior of a traditional Kyrgyz yurt with colorful felt rugs',
      'Түстүү кийиз оймо-чиймелери менен салттуу кыргыз юртасынын ички көрүнүшү',
      'Интерьер традиционной кыргызской юрты с яркими войлочными коврами',
    ),
    price: null,
    currency: 'USD',
    pricePer: L('per night · whole yurt', 'түнүнө · юртага', 'за ночь · за юрту'),
    amenities: [
      {
        label: L('Authentic nomadic experience', 'Чыныгы көчмөн турмушу', 'Настоящий кочевой быт'),
        confirmed: true,
      },
      {
        label: L('Stove & extra blankets', 'Меш жана кошумча жууркандар', 'Печка и дополнительные одеяла'),
        confirmed: false,
      },
      {
        label: L('Shared facilities nearby', 'Жакын жерде жалпы жарыккана', 'Удобства рядом'),
        confirmed: false,
      },
      {
        label: L('Seasonal availability', 'Сезондук жеткиликтүүлүк', 'Сезонная доступность'),
        confirmed: false,
      },
    ],
  },
];

export interface TourItem {
  id: 'sonkul-2day' | 'sonkul-multi';
  name: LocalizedText;
  tagline: LocalizedText;
  desc: LocalizedText;
  duration: LocalizedText;
  level: LocalizedText;
  season: LocalizedText;
  price: number | null;
  itinerary: Array<{ day: LocalizedText; text: LocalizedText }>;
  includes: Array<{ label: LocalizedText; confirmed: boolean }>;
}

export const TOURS: TourItem[] = [
  {
    id: 'sonkul-2day',
    name: L('Son-Kul Express', 'Соң-Көл экспресс', 'Сон-Куль Экспресс'),
    tagline: L('2 days · 1 night', '2 күн · 1 түн', '2 дня · 1 ночь'),
    desc: L(
      'The classic ride from Kyzart: cross the high pastures of Kilemche, sleep in a shepherd yurt, and descend to the shores of Son-Kul Lake the next day. Itinerary below is a sample and will be confirmed by your guide.',
      'Кызарттан классикалык ат жолу: Килемченин бийик жайыттарын кесип өтүп, койчунун юртасында түнөп, эртеси Соң-Көлдүн жээгине түшөсүз. Төмөнкү программа — үлгү; жол көрсөтүүчү менен такталат.',
      'Классический маршрут из Кызарта: через высокие пастбища Килемче, ночёвка в пастушьей юрте и спуск к берегам озера Сон-Куль на следующий день. Программа ниже — образец, детали уточняются у гида.',
    ),
    duration: L('2 days / 1 night', '2 күн / 1 түн', '2 дня / 1 ночь'),
    level: L('Beginner friendly', 'Жаңы баштагандарга ылайыктуу', 'Подходит новичкам'),
    season: L(
      'June – September · confirm dates',
      'Июнь – сентябрь · күндөрү такталат',
      'Июнь – сентябрь · даты уточняются',
    ),
    price: null,
    itinerary: [
      {
        day: L('Day 1', '1-күн', 'День 1'),
        text: L(
          'Ride out from Kyzart village, climb over the Chaar-Archa pass and reach the green jailoo of Kilemche. Overnight in a traditional yurt with a shepherd family. (Sample — to be confirmed.)',
          'Кызарт айылынан чыгып, Чаар-Арча ашуусунан ашып, Килемченин жашыл жайлоосуна жетесиз. Койчу үй-бүлөсүнүн салттуу юртасында түнөө. (Үлгү — такталат.)',
          'Выезд из села Кызарт, подъём через перевал Чаар-Арча к зелёным джайлоо Килемче. Ночёвка в традиционной юрте у пастушьей семьи. (Образец — уточняется.)',
        ),
      },
      {
        day: L('Day 2', '2-күн', 'День 2'),
        text: L(
          'Cross the Batai-Aral pass and descend to the wide blue expanse of Son-Kul Lake at 3,016 m. Time on the shore, then return to Kyzart. (Sample — to be confirmed.)',
          'Батай-Арал ашуусунан ашып, 3 016 м бийиктиктеги Соң-Көлдүн кең көк мейкинине түшөсүз. Жээкте эс алып, Кызартка кайтасыз. (Үлгү — такталат.)',
          'Переход через перевал Чаар-Арча / Батай-Арал и спуск к безбрежной синеве озера Сон-Куль на высоте 3 016 м. Время на берегу и возвращение в Кызарт. (Образец — уточняется.)'.replace(
            'Чаар-Арча / ',
            '',
          ),
        ),
      },
    ],
    includes: [
      {
        label: L(
          'Horse, saddle & local horseman-guide',
          'Ат, ээр жана жергиликтүү атчы-жол көрсөтүүчү',
          'Лошадь, седло и местный егерь-проводник',
        ),
        confirmed: false,
      },
      {
        label: L(
          'Overnight in a traditional yurt camp',
          'Салттуу юрта лагеринде түнөө',
          'Ночёвка в традиционном лагере юрт',
        ),
        confirmed: false,
      },
      {
        label: L('Meals on the trail', 'Жолдогу тамак-аш', 'Питание на маршруте'),
        confirmed: false,
      },
      {
        label: L('Return to Kyzart', 'Кызартка кайтуу', 'Возвращение в Кызарт'),
        confirmed: false,
      },
    ],
  },
  {
    id: 'sonkul-multi',
    name: L('Nomad Trek', 'Көчмөн трек', 'Кочевой трек'),
    tagline: L('3–5 days', '3–5 күн', '3–5 дней'),
    desc: L(
      'For travelers who want to go deeper: multi-day routes linking Kyzart with Son-Kul and the surrounding jailoos, with nights in different yurt camps and long days in the saddle. Route, duration and price are built around your group.',
      'Тереңирээк баргысы келгендер үчүн: Кызартты Соң-Көл жана айланадагы жайлоолор менен байланыштырган көп күндүк маршруттар, түрдүү юрта лагерлеринде түнөө жана узак күндөр ат үстүндө. Маршрут, узактык жана баа сиздин топко жараша түзүлөт.',
      'Для тех, кто хочет большего: многодневные маршруты, соединяющие Кызарт, Сон-Куль и окрестные джайлоо, с ночёвками в разных лагерях юрт и длинными днями в седле. Маршрут, длительность и цена подбираются под вашу группу.',
    ),
    duration: L('3–5 days · flexible', '3–5 күн · ийкемдүү', '3–5 дней · гибко'),
    level: L(
      'Some riding experience recommended',
      'Ат минип тажрыйба болушу сунушталат',
      'Желателен опыт верховой езды',
    ),
    season: L(
      'June – September · confirm dates',
      'Июнь – сентябрь · күндөрү такталат',
      'Июнь – сентябрь · даты уточняются',
    ),
    price: null,
    itinerary: [
      {
        day: L('Your plan', 'Сиздин план', 'Ваш план'),
        text: L(
          'Tell us how many days you have and what you want to see — we will propose a route across the passes and pastures around Son-Kul. (Sample format — details to be confirmed.)',
          'Канча күнүңүз бар жана эмнени көргүңүз келерин айтыңыз — биз Соң-Көлдүн айланасындагы ашуулар жана жайыттар аркылуу маршрут сунуштайбыз. (Үлгү формат — деталдар такталат.)',
          'Расскажите, сколько у вас дней и что вы хотите увидеть, — мы предложим маршрут по перевалам и пастбищам вокруг Сон-Куля. (Формат-образец — детали уточняются.)',
        ),
      },
    ],
    includes: [
      {
        label: L(
          'Horses, gear & experienced guide',
          'Аттар, жабдуу жана тажрыйбалуу жол көрсөтүүчү',
          'Лошади, снаряжение и опытный проводник',
        ),
        confirmed: false,
      },
      {
        label: L(
          'All nights in yurt camps',
          'Бардык түндөр юрта лагерлеринде',
          'Все ночёвки в лагерях юрт',
        ),
        confirmed: false,
      },
      {
        label: L('Full board on the trail', 'Жолдо толук питание', 'Полное питание на маршруте'),
        confirmed: false,
      },
      {
        label: L(
          'Support with luggage & transfers',
          'Жүк жана трансфер боюнча жардам',
          'Помощь с багажом и трансферами',
        ),
        confirmed: false,
      },
    ],
  },
];

export const TOUR_IMAGES: Record<TourItem['id'], { src: string; alt: string }> = {
  'sonkul-2day': {
    src: '/images/sonkul.jpg',
    alt: 'Son-Kul Lake surrounded by alpine pastures',
  },
  'sonkul-multi': {
    src: '/images/pass.jpg',
    alt: 'Horseback riders crossing a high mountain pass',
  },
};

export const TRAIL_STOPS: LocalizedText[] = [
  L('Kyzart Village', 'Кызарт айылы', 'с. Кызарт'),
  L('Chaar-Archa Pass', 'Чаар-Арча ашуусу', 'пер. Чаар-Арча'),
  L('Kilemche Jailoo', 'Килемче жайлоосу', 'джайлоо Килемче'),
  L('Batai-Aral Pass', 'Батай-Арал ашуусу', 'пер. Батай-Арал'),
  L('Son-Kul Lake', 'Соң-Көл', 'оз. Сон-Куль'),
];

export type ExperienceStatus = 'available' | 'seasonal' | 'on-request';

export interface ExperienceItem {
  id: string;
  title: LocalizedText;
  text: LocalizedText;
  img: string;
  alt: LocalizedText;
  status: ExperienceStatus;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'riding',
    title: L(
      'Horseback Riding in the Mountains',
      'Тоолордо ат минип жүрүү',
      'Верховая езда в горах',
    ),
    text: L(
      'From short evening rides to full-day routes over the passes — on calm local horses with our horsemen.',
      'Кечки кыска сейилдөөдөн ашуулар аркылуу бүт күндүк маршруттарга чейин — тынч жергиликтүү аттарда, биздин атчылар менен.',
      'От коротких вечерних прогулок до целого дня в горах — на спокойных местных лошадях с нашими егерями.',
    ),
    img: '/images/horses.jpg',
    alt: L(
      'Kyrgyz horseman riding across green mountain slopes',
      'Жашыл тоо капталдарында ат минип бараткан кыргыз атчысы',
      'Кыргызский наездник на зелёных горных склонах',
    ),
    status: 'available',
  },
  {
    id: 'sonkul',
    title: L('Visiting Son-Kul Lake', 'Соң-Көлгө баруу', 'Поездка на озеро Сон-Куль'),
    text: L(
      'The legendary high-altitude lake of the nomads, ringed by summer pastures and yurt camps.',
      'Көчмөндөрдүн уламыштык бийик тоолуу көлү, жайкы жайыттар жана юрта лагерлери менен курчалган.',
      'Легендарное высокогорное озеро кочевников, окружённое летними пастбищами и лагерями юрт.',
    ),
    img: '/images/sonkul.jpg',
    alt: L(
      'Son-Kul Lake with horses on the shore',
      'Соң-Көл жээгиндеги аттар',
      'Озеро Сон-Куль с лошадьми на берегу',
    ),
    status: 'seasonal',
  },
  {
    id: 'food',
    title: L(
      'Traditional Kyrgyz Meals',
      'Салттуу кыргыз тамактары',
      'Традиционная кыргызская кухня',
    ),
    text: L(
      'Fresh bread, boorsok, jams and tea from the family kitchen — the taste of a Kyrgyz dastarkhan.',
      'Үй ашканасынан жаңы нан, боорсок, варенье жана чай — кыргыз дасторконунун даамы.',
      'Свежий хлеб, боорсок, варенье и чай из семейной кухни — вкус настоящего кыргызского дасторкона.',
    ),
    img: '/images/food.jpg',
    alt: L(
      'Kyrgyz dastarkhan with bread, boorsok and tea',
      'Нан, боорсок жана чай менен кыргыз дасторкону',
      'Кыргызский дасторкон с хлебом, боорсоками и чаем',
    ),
    status: 'available',
  },
  {
    id: 'culture',
    title: L(
      'Nomadic Culture & Yurt Life',
      'Көчмөн маданияты жана юрта турмушу',
      'Кочевая культура и жизнь в юрте',
    ),
    text: L(
      'Step inside a felt yurt, learn how it is built, and hear how families move with the seasons.',
      'Кийиз юртанын ичине кириңиз, анын кантип курулганын билиңиз жана үй-бүлөлөрдүн мезгил менен кантип көчкөнүн угуңуз.',
      'Загляните внутрь войлочной юрты, узнайте, как её собирают, и как семьи переезжают по сезонам.',
    ),
    img: '/images/yurt-interior.jpg',
    alt: L(
      'Inside of a traditional Kyrgyz yurt',
      'Салттуу кыргыз юртасынын ичи',
      'Внутри традиционной кыргызской юрты',
    ),
    status: 'on-request',
  },
  {
    id: 'village',
    title: L(
      'Village Life & Mountain Walks',
      'Айыл турмушу жана тоо сейилдөөлөрү',
      'Деревенская жизнь и прогулки в горах',
    ),
    text: L(
      'Watch the herds come home at dusk, walk to the viewpoints above Kyzart and breathe the thin, clean air.',
      'Күүгүмдө үйүрлөрдүн кайтканын көрүңүз, Кызарттын үстүндөгү көрүнүш аянтчаларына басыңыз жана таза, сейрек абадан дем алыңыз.',
      'Проводите стада домой на закате, поднимитесь на смотровые точки над Кызартом и вдохните чистый разреженный воздух.',
    ),
    img: '/images/village.jpg',
    alt: L(
      'Kyzart village with mountains behind',
      'Тоолордун фонундагы Кызарт айылы',
      'Село Кызарт на фоне гор',
    ),
    status: 'available',
  },
  {
    id: 'craft',
    title: L(
      'Felt & Craft Demonstrations',
      'Кийиз жана кол өнөрчүлүк көрсөтүү',
      'Мастер-классы по войлоку',
    ),
    text: L(
      'On request — meet local artisans and see how shyrdak felt carpets are made by hand.',
      'Суроо боюнча — жергиликтүү чеберлер менен таанышып, шырдактын кол менен кантип жасалганын көрүңүз.',
      'По запросу — встреча с местными мастерицами и демонстрация создания войлочных шырдаков.',
    ),
    img: '/images/interior.jpg',
    alt: L(
      'Colorful shyrdak felt carpets in a Kyrgyz home',
      'Кыргыз үйүндөгү түстүү шырдактар',
      'Яркие войлочные шырдаки в кыргызском доме',
    ),
    status: 'on-request',
  },
];

export interface GalleryPhoto {
  src: string;
  caption: LocalizedText;
  tall?: boolean;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: '/images/hero.jpg',
    caption: L(
      'Summer pastures above the valley',
      'Дөңсөөнүн үстүндөгү жайкы жайыттар',
      'Летние пастбища над долиной',
    ),
  },
  {
    src: '/images/yurt.jpg',
    caption: L('Yurt camp on the jailoo', 'Жайлоодогу юрта лагери', 'Лагерь юрт на джайлоо'),
    tall: true,
  },
  {
    src: '/images/sonkul.jpg',
    caption: L('Blue expanse of Son-Kul', 'Соң-Көлдүн көк кеңдиги', 'Синяя гладь Сон-Куля'),
  },
  {
    src: '/images/room.jpg',
    caption: L(
      'A guest room in the house',
      'Үйдөгү конок бөлмөсү',
      'Комната для гостей в доме',
    ),
  },
  {
    src: '/images/horses.jpg',
    caption: L(
      'Herder on the mountain slopes',
      'Тоо капталдарындагы малчы',
      'Чабан на горных склонах',
    ),
    tall: true,
  },
  {
    src: '/images/food.jpg',
    caption: L(
      'Bread and tea from our kitchen',
      'Ашканабыздан нан жана чай',
      'Хлеб и чай из нашей кухни',
    ),
  },
  {
    src: '/images/yurt-interior.jpg',
    caption: L('Inside a family yurt', 'Үй-бүлөлүк юртанын ичи', 'Внутри семейной юрты'),
  },
  {
    src: '/images/village.jpg',
    caption: L('Morning in Kyzart village', 'Кызарт айылында таң', 'Утро в селе Кызарт'),
    tall: true,
  },
  {
    src: '/images/pass.jpg',
    caption: L(
      'Riders on the pass above Son-Kul',
      'Соң-Көлдүн үстүндөгү ашуудагы атчандар',
      'Всадники на перевале над Сон-Кулем',
    ),
  },
  {
    src: '/images/interior.jpg',
    caption: L(
      'Shyrdak carpets in the guesthouse',
      'Конок үйдөгү шырдактар',
      'Шырдаки в гостевом доме',
    ),
  },
];

export interface TravelRouteItem {
  id: string;
  icon: 'car' | 'compass' | 'mountain';
  title: LocalizedText;
  text: LocalizedText;
}

export const TRAVEL_ROUTES: TravelRouteItem[] = [
  {
    id: 'bishkek',
    icon: 'car',
    title: L('From Bishkek', 'Бишкектен', 'Из Бишкека'),
    text: L(
      '[Add your recommended route, distance and travel time — e.g. shared taxi, marshrutka via Kochkor, or private transfer. Placeholder text.]',
      '[Бишкектен сунушталган маршрутту, аралыкты жана убакытты кошуңуз — мисалы, такси, Кочкор аркылуу маршрутка же жеке трансфер. Үлгү текст.]',
      '[Добавьте рекомендованный маршрут, расстояние и время в пути — например, такси, маршрутка через Кочкор или частный трансфер. Текст-заглушка.]',
    ),
  },
  {
    id: 'kochkor',
    icon: 'compass',
    title: L('From Kochkor', 'Кочкордон', 'Из Кочкора'),
    text: L(
      '[Add directions from Kochkor — local taxi options, approximate duration and what to tell the driver. Placeholder text.]',
      '[Кочкордон кантип жетүү керектигин кошуңуз — жергиликтүү такси варианттары, болжолдуу убакыт жана айдоочуга эмне деп айтуу керектигин. Үлгү текст.]',
      '[Добавьте маршрут из Кочкора — варианты местного такси, примерное время и что сказать водителю. Текст-заглушка.]',
    ),
  },
  {
    id: 'sonkul',
    icon: 'mountain',
    title: L('From Son-Kul', 'Соң-Көлдөн', 'С Сон-Куля'),
    text: L(
      '[Coming down from the lake? Add notes for hikers and riders arriving from the Son-Kul side. Placeholder text.]',
      '[Көлдөн түшүп келе жатасызбы? Соң-Көл тараптан келген жөө жүрүүчүлөр жана атчандар үчүн эскертүүлөрдү кошуңуз. Үлгү текст.]',
      '[Спускаетесь с озера? Добавьте заметки для туристов и всадников, прибывающих со стороны Сон-Куля. Текст-заглушка.]',
    ),
  },
];

export const JOURNEY_CARDS: Array<{
  key: 'stay' | 'tours' | 'visit';
  to: RouteKey;
  img: string;
}> = [
  { key: 'stay', to: 'stay', img: '/images/room.jpg' },
  { key: 'tours', to: 'tours', img: '/images/horses.jpg' },
  { key: 'visit', to: 'visit', img: '/images/village.jpg' },
];
