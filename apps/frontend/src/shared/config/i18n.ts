export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export const translations = {
  ru: {
    nav: {
      home: 'Главная',
      yoga: 'Йога',
      tea: 'Чайная',
      bookClub: 'Книжный клуб',
      about: 'О нас',
      contacts: 'Контакты',
    },
    hero: {
      title: 'Творческое пространство',
      subtitle: 'Йога • Чай • Книги • Искусство',
      cta: 'Исследовать',
      learnMore: 'Узнать больше',
    },
    directions: {
      title: 'Наши направления',
      subtitle: 'Откройте для себя уникальное пространство творчества и развития',
      yoga: {
        title: 'Йога',
        description: 'Классы для всех уровней подготовки. Хатха, виньяса, йога-нидра.',
      },
      tea: {
        title: 'Чайная',
        description: 'Отборные сорта чая со всего мира. Чайные церемонии и дегустации.',
      },
      bookClub: {
        title: 'Книжный клуб',
        description: 'Литературные встречи, обсуждения книг, творческие вечера.',
      },
    },
    yoga: {
      hero: {
        title: 'Путь к гармонии тела и разума',
        subtitle: 'Практикуйте йогу с опытными инструкторами в уютной атмосфере нашей студии',
        schedule: 'Посмотреть расписание',
        subscriptions: 'Выбрать абонемент',
      },
      schedule: {
        title: 'Расписание занятий',
        subtitle: 'Выберите удобное время для практики',
        spots: 'мест',
        noSpots: 'Мест нет',
        register: 'Записаться',
      },
      subscriptions: {
        title: 'Абонементы',
        subtitle: 'Выберите подходящий тариф и начните регулярную практику',
        popular: 'Популярный',
        perClass: 'за занятие',
        choose: 'Выбрать',
      },
      instructors: {
        title: 'Наши инструкторы',
        subtitle: 'Опытные преподаватели с международными сертификатами',
        experience: 'Опыт',
        years: 'лет',
        specialization: 'Специализация',
        certificates: 'Сертификаты',
      },
      blog: {
        title: 'Блог о йоге',
        subtitle: 'Полезные статьи о практике, философии и здоровом образе жизни',
        read: 'Читать',
        allPosts: 'Все статьи',
      },
    },
    footer: {
      brand: 'Creative Cluster',
      description: 'Творческое пространство в сердце Самары',
      navigation: 'Навигация',
      contacts: 'Контакты',
      social: 'Соцсети',
      copyright: 'Все права защищены.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      yoga: 'Yoga',
      tea: 'Tea House',
      bookClub: 'Book Club',
      about: 'About',
      contacts: 'Contacts',
    },
    hero: {
      title: 'Creative Space',
      subtitle: 'Yoga • Tea • Books • Art',
      cta: 'Explore',
      learnMore: 'Learn More',
    },
    directions: {
      title: 'Our Directions',
      subtitle: 'Discover a unique space for creativity and growth',
      yoga: {
        title: 'Yoga',
        description: 'Classes for all levels. Hatha, vinyasa, yoga nidra.',
      },
      tea: {
        title: 'Tea House',
        description: 'Premium tea selection from around the world. Tea ceremonies and tastings.',
      },
      bookClub: {
        title: 'Book Club',
        description: 'Literary meetings, book discussions, creative evenings.',
      },
    },
    footer: {
      brand: 'Creative Cluster',
      description: 'Creative space in the heart of Samara',
      navigation: 'Navigation',
      contacts: 'Contacts',
      social: 'Social',
      copyright: 'All rights reserved.',
    },
  },
} as const;
