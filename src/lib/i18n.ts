export type Locale = "ru" | "en" | "ky"

export interface Translations {
  nav: {
    home: string
    players: string
    compare: string
    admin: string
    search: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
    stats_players: string
    stats_clubs: string
    stats_countries: string
    stats_scouts: string
  }
  features: {
    title: string
    subtitle: string
    analytics_title: string
    analytics_desc: string
    database_title: string
    database_desc: string
    compare_title: string
    compare_desc: string
    reports_title: string
    reports_desc: string
  }
  players: {
    title: string
    subtitle: string
    search_placeholder: string
    filter_position: string
    filter_club: string
    filter_age: string
    filter_nationality: string
    all: string
    forward: string
    midfielder: string
    defender: string
    goalkeeper: string
    sort_by: string
    sort_rating: string
    sort_age: string
    sort_name: string
    years: string
    view_profile: string
    add_to_compare: string
  }
  profile: {
    overview: string
    stats: string
    history: string
    reports: string
    age: string
    nationality: string
    club: string
    position: string
    height: string
    weight: string
    foot: string
    contract_until: string
    market_value: string
    pace: string
    shooting: string
    passing: string
    dribbling: string
    defending: string
    physical: string
    appearances: string
    goals: string
    assists: string
    clean_sheets: string
    rating: string
    back: string
  }
  compare: {
    title: string
    subtitle: string
    select_player: string
    player_a: string
    player_b: string
    no_selection: string
    vs: string
  }
  admin: {
    title: string
    language: string
    content: string
    players_management: string
    settings: string
    current_language: string
    edit_texts: string
    save: string
    saved: string
    section: string
    key: string
    value: string
    add_player: string
    edit_player: string
    delete_player: string
    confirm_delete: string
    cancel: string
    player_name: string
    player_age: string
    player_club: string
    player_position: string
    player_nationality: string
    player_rating: string
    player_image: string
    site_title: string
    site_description: string
    logout: string
    login: string
    password: string
    login_title: string
    login_error: string
  }
  footer: {
    description: string
    links: string
    contact: string
    rights: string
  }
}

export const translations: Record<Locale, Translations> = {
  ru: {
    nav: {
      home: "Главная",
      players: "Игроки",
      compare: "Сравнение",
      admin: "Админ",
      search: "Поиск игроков...",
    },
    hero: {
      title: "Профессиональный скаутинг футболистов",
      subtitle: "Аналитическая платформа нового поколения для поиска, оценки и сравнения футбольных талантов по всему миру",
      cta: "Начать поиск",
      stats_players: "Игроков",
      stats_clubs: "Клубов",
      stats_countries: "Стран",
      stats_scouts: "Скаутов",
    },
    features: {
      title: "Возможности платформы",
      subtitle: "Инструменты профессионального уровня для скаутинга",
      analytics_title: "Продвинутая аналитика",
      analytics_desc: "Глубокий анализ статистики игроков с использованием передовых метрик и визуализации данных",
      database_title: "База данных игроков",
      database_desc: "Обширная база данных с подробными профилями более 12,000 футболистов со всего мира",
      compare_title: "Инструмент сравнения",
      compare_desc: "Сравнивайте игроков по множеству параметров для принятия обоснованных решений",
      reports_title: "Скаутинг-отчёты",
      reports_desc: "Создавайте детальные отчёты для руководства клуба и тренерского штаба",
    },
    players: {
      title: "База игроков",
      subtitle: "Поиск и фильтрация футболистов",
      search_placeholder: "Поиск по имени...",
      filter_position: "Позиция",
      filter_club: "Клуб",
      filter_age: "Возраст",
      filter_nationality: "Национальность",
      all: "Все",
      forward: "Нападающий",
      midfielder: "Полузащитник",
      defender: "Защитник",
      goalkeeper: "Вратарь",
      sort_by: "Сортировка",
      sort_rating: "По рейтингу",
      sort_age: "По возрасту",
      sort_name: "По имени",
      years: "лет",
      view_profile: "Профиль",
      add_to_compare: "Сравнить",
    },
    profile: {
      overview: "Обзор",
      stats: "Статистика",
      history: "История",
      reports: "Отчёты",
      age: "Возраст",
      nationality: "Национальность",
      club: "Клуб",
      position: "Позиция",
      height: "Рост",
      weight: "Вес",
      foot: "Нога",
      contract_until: "Контракт до",
      market_value: "Рыночная стоимость",
      pace: "Скорость",
      shooting: "Удар",
      passing: "Пас",
      dribbling: "Дриблинг",
      defending: "Защита",
      physical: "Физика",
      appearances: "Матчи",
      goals: "Голы",
      assists: "Ассисты",
      clean_sheets: "Сухие матчи",
      rating: "Рейтинг",
      back: "Назад",
    },
    compare: {
      title: "Сравнение игроков",
      subtitle: "Выберите двух игроков для детального сравнения",
      select_player: "Выберите игрока",
      player_a: "Игрок A",
      player_b: "Игрок B",
      no_selection: "Игрок не выбран",
      vs: "VS",
    },
    admin: {
      title: "Панель управления",
      language: "Язык",
      content: "Контент",
      players_management: "Управление игроками",
      settings: "Настройки",
      current_language: "Текущий язык",
      edit_texts: "Редактирование текстов",
      save: "Сохранить",
      saved: "Сохранено!",
      section: "Раздел",
      key: "Ключ",
      value: "Значение",
      add_player: "Добавить игрока",
      edit_player: "Редактировать",
      delete_player: "Удалить",
      confirm_delete: "Вы уверены?",
      cancel: "Отмена",
      player_name: "Имя",
      player_age: "Возраст",
      player_club: "Клуб",
      player_position: "Позиция",
      player_nationality: "Нац.",
      player_rating: "Рейтинг",
      player_image: "URL фото",
      site_title: "Название сайта",
      site_description: "Описание",
      logout: "Выйти",
      login: "Войти",
      password: "Пароль",
      login_title: "Вход в админ-панель",
      login_error: "Неверный пароль",
    },
    footer: {
      description: "Профессиональная платформа для скаутинга футбольных талантов",
      links: "Ссылки",
      contact: "Контакты",
      rights: "Все права защищены",
    },
  },
  en: {
    nav: {
      home: "Home",
      players: "Players",
      compare: "Compare",
      admin: "Admin",
      search: "Search players...",
    },
    hero: {
      title: "Professional Football Scouting",
      subtitle: "Next-generation analytics platform for discovering, evaluating, and comparing football talents worldwide",
      cta: "Start Scouting",
      stats_players: "Players",
      stats_clubs: "Clubs",
      stats_countries: "Countries",
      stats_scouts: "Scouts",
    },
    features: {
      title: "Platform Features",
      subtitle: "Professional-grade scouting tools",
      analytics_title: "Advanced Analytics",
      analytics_desc: "Deep player statistics analysis using cutting-edge metrics and data visualization",
      database_title: "Player Database",
      database_desc: "Extensive database with detailed profiles of over 12,000 footballers worldwide",
      compare_title: "Comparison Tool",
      compare_desc: "Compare players across multiple parameters for informed decision-making",
      reports_title: "Scouting Reports",
      reports_desc: "Generate detailed reports for club management and coaching staff",
    },
    players: {
      title: "Player Database",
      subtitle: "Search and filter footballers",
      search_placeholder: "Search by name...",
      filter_position: "Position",
      filter_club: "Club",
      filter_age: "Age",
      filter_nationality: "Nationality",
      all: "All",
      forward: "Forward",
      midfielder: "Midfielder",
      defender: "Defender",
      goalkeeper: "Goalkeeper",
      sort_by: "Sort by",
      sort_rating: "By rating",
      sort_age: "By age",
      sort_name: "By name",
      years: "y.o.",
      view_profile: "Profile",
      add_to_compare: "Compare",
    },
    profile: {
      overview: "Overview",
      stats: "Statistics",
      history: "History",
      reports: "Reports",
      age: "Age",
      nationality: "Nationality",
      club: "Club",
      position: "Position",
      height: "Height",
      weight: "Weight",
      foot: "Foot",
      contract_until: "Contract until",
      market_value: "Market Value",
      pace: "Pace",
      shooting: "Shooting",
      passing: "Passing",
      dribbling: "Dribbling",
      defending: "Defending",
      physical: "Physical",
      appearances: "Appearances",
      goals: "Goals",
      assists: "Assists",
      clean_sheets: "Clean Sheets",
      rating: "Rating",
      back: "Back",
    },
    compare: {
      title: "Player Comparison",
      subtitle: "Select two players for detailed comparison",
      select_player: "Select player",
      player_a: "Player A",
      player_b: "Player B",
      no_selection: "No player selected",
      vs: "VS",
    },
    admin: {
      title: "Control Panel",
      language: "Language",
      content: "Content",
      players_management: "Players Management",
      settings: "Settings",
      current_language: "Current Language",
      edit_texts: "Edit Texts",
      save: "Save",
      saved: "Saved!",
      section: "Section",
      key: "Key",
      value: "Value",
      add_player: "Add Player",
      edit_player: "Edit",
      delete_player: "Delete",
      confirm_delete: "Are you sure?",
      cancel: "Cancel",
      player_name: "Name",
      player_age: "Age",
      player_club: "Club",
      player_position: "Position",
      player_nationality: "Nat.",
      player_rating: "Rating",
      player_image: "Photo URL",
      site_title: "Site Title",
      site_description: "Description",
      logout: "Logout",
      login: "Login",
      password: "Password",
      login_title: "Admin Login",
      login_error: "Invalid password",
    },
    footer: {
      description: "Professional football talent scouting platform",
      links: "Links",
      contact: "Contact",
      rights: "All rights reserved",
    },
  },
  ky: {
    nav: {
      home: "Башкы бет",
      players: "Оюнчулар",
      compare: "Салыштыруу",
      admin: "Админ",
      search: "Оюнчуларды издөө...",
    },
    hero: {
      title: "Кесипкөй футболчуларды скаутинг",
      subtitle: "Бүткүл дүйнөдөгү футбол таланттарын табуу, баалоо жана салыштыруу үчүн жаңы муундун аналитикалык платформасы",
      cta: "Издөөнү баштоо",
      stats_players: "Оюнчулар",
      stats_clubs: "Клубдар",
      stats_countries: "Өлкөлөр",
      stats_scouts: "Скауттар",
    },
    features: {
      title: "Платформанын мүмкүнчүлүктөрү",
      subtitle: "Кесипкөй деңгээлдеги скаутинг куралдары",
      analytics_title: "Өркүндөтүлгөн аналитика",
      analytics_desc: "Алдыңкы метрикаларды жана маалыматтарды визуалдаштырууну колдонуу менен оюнчулардын статистикасын терең талдоо",
      database_title: "Оюнчулардын базасы",
      database_desc: "Бүткүл дүйнөдөн 12,000дөн ашык футболчулардын толук профилдери менен кеңири маалымат базасы",
      compare_title: "Салыштыруу куралы",
      compare_desc: "Негизделген чечимдерди кабыл алуу үчүн оюнчуларды көптөгөн параметрлер боюнча салыштырыңыз",
      reports_title: "Скаутинг отчеттору",
      reports_desc: "Клубдун жетекчилиги жана машыктыруучулар штабы үчүн толук отчеттор түзүңүз",
    },
    players: {
      title: "Оюнчулардын базасы",
      subtitle: "Футболчуларды издөө жана чыпкалоо",
      search_placeholder: "Аты боюнча издөө...",
      filter_position: "Позициясы",
      filter_club: "Клуб",
      filter_age: "Жашы",
      filter_nationality: "Улуту",
      all: "Баары",
      forward: "Чабуулчу",
      midfielder: "Ортомчу",
      defender: "Коргоочу",
      goalkeeper: "Дарбазачы",
      sort_by: "Тартипке келтирүү",
      sort_rating: "Рейтинг боюнча",
      sort_age: "Жаш боюнча",
      sort_name: "Аты боюнча",
      years: "жаш",
      view_profile: "Профиль",
      add_to_compare: "Салыштыруу",
    },
    profile: {
      overview: "Жалпы маалымат",
      stats: "Статистика",
      history: "Тарых",
      reports: "Отчеттор",
      age: "Жашы",
      nationality: "Улуту",
      club: "Клуб",
      position: "Позициясы",
      height: "Бою",
      weight: "Салмагы",
      foot: "Бут",
      contract_until: "Контракт",
      market_value: "Рыноктук наркы",
      pace: "Ылдамдык",
      shooting: "Сокку",
      passing: "Берүү",
      dribbling: "Дриблинг",
      defending: "Коргоо",
      physical: "Физика",
      appearances: "Оюндар",
      goals: "Голдор",
      assists: "Аcсисттер",
      clean_sheets: "Кургак оюндар",
      rating: "Рейтинг",
      back: "Артка",
    },
    compare: {
      title: "Оюнчуларды салыштыруу",
      subtitle: "Толук салыштыруу үчүн эки оюнчуну тандаңыз",
      select_player: "Оюнчуну тандаңыз",
      player_a: "Оюнчу A",
      player_b: "Оюнчу B",
      no_selection: "Оюнчу тандалган эмес",
      vs: "VS",
    },
    admin: {
      title: "Башкаруу панели",
      language: "Тил",
      content: "Мазмун",
      players_management: "Оюнчуларды башкаруу",
      settings: "Жөндөөлөр",
      current_language: "Учурдагы тил",
      edit_texts: "Тексттерди өзгөртүү",
      save: "Сактоо",
      saved: "Сакталды!",
      section: "Бөлүм",
      key: "Ачкыч",
      value: "Маани",
      add_player: "Оюнчу кошуу",
      edit_player: "Өзгөртүү",
      delete_player: "Өчүрүү",
      confirm_delete: "Ишенимдүүсүзбү?",
      cancel: "Жокко чыгаруу",
      player_name: "Аты",
      player_age: "Жашы",
      player_club: "Клуб",
      player_position: "Позиция",
      player_nationality: "Улуту",
      player_rating: "Рейтинг",
      player_image: "Сүрөттүн URL",
      site_title: "Сайттын аталышы",
      site_description: "Сүрөттөмө",
      logout: "Чыгуу",
      login: "Кирүү",
      password: "Сырсөз",
      login_title: "Админ кирүү",
      login_error: "Туура эмес сырсөз",
    },
    footer: {
      description: "Футбол таланттарын скаутингге арналган кесипкөй платформа",
      links: "Шилтемелер",
      contact: "Байланыш",
      rights: "Бардык укуктар корголгон",
    },
  },
}
