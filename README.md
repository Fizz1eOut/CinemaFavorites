# CinemaFavorites

Это веб-приложение для поиска и просмотра информации о фильмах, сериалах, мультфильмах, актёрах и трейлерах, а также сохранения избранного контента. Пользовательский интерфейс поддерживает динамическое отображение популярного контента и предоставляет удобные фильтры для сортировки по жанрам, рейтингу, дате выпуска и другим критериям. Реализована поддержка поиска как по названию, так и по ключевым словам, что позволяет быстро находить интересующие фильмы или актеров.

Каждая карточка с фильмом или актером содержит детализированную информацию, включая синопсисы, актёрский состав, рейтинги, и даже видеотрейлеры для полного погружения в контент. Кроме того, реализована возможность добавления фильмов, сериалов и актеров в избранное, чтобы пользователи могли быстро возвращаться к понравившемуся контенту.

Интерфейс адаптирован под разные устройства, что обеспечивает удобство использования как на компьютерах, так и на мобильных устройствах. Встроенная система рекомендаций предлагает пользователям популярные и трендовые фильмы и сериалы на основе их интересов и текущих трендов.

# Основные возможности

- **Фильтрация по параметрам**: Возможность фильтровать фильмы, сериалы и мультфильмы по жанрам, годам выпуска, странам производства и сортировка контента по рейтингу (от низкого к высокому или наоборот).
- **Динамическое обновление фильтров в URL**: Фильтры синхронизируются с параметрами в URL, что позволяет пользователям делиться ссылками с конкретными фильтрами и сортировкой.
- **Просмотр трейлеров**: Встроенные трейлеры для каждого фильма, сериала или мультфильма для полного погружения в контент. Трейлеры могут отображаться как в встроенном виде, так и через модальные окна для удобства пользователей.
- **Детальная информация о контенте**: Отображение подробных данных о выбранном фильме, сериале или мультфильме, таких как описание, жанры и похожие работы.
- **Информация об актерах**: Детализированные данные о выбранных актерах и их известных работах.
- **Поиск и навигация**: Удобный динамический поиск с автозаполнением и подсказками, позволяющий быстро находить фильмы, сериалы, мультфильмы и актеров.
- **Избранное**: Возможность сохранять фильмы, сериалы и мультфильмы в избранное для быстрого доступа, с сохранением данных в `localStorage` между сессиями.
- **Адаптивный интерфейс**: Поддержка мобильных устройств и динамическая настройка отображения компонентов для удобства использования.

## Функциональные особенности

### Многоуровневая фильтрация
- **Жанры**: Возможность выбора нескольких жанров для фильтрации контента (фильмов, сериалов, мультфильмов).
- **Годы выпуска**: Поддержка фильтрации по годам выпуска фильмов, сериалов и мультфильмов.
- **Страны**: Возможность фильтровать контент по странам производства.
- **Сортировка**: Сортировка контента по рейтингу, с возможностью выбора порядка (от низкого к высокому или наоборот).

### Избранное
- Пользователи могут добавлять фильмы, сериалы и мультфильмы в избранное, чтобы быстро возвращаться к понравившемуся контенту. Все данные сохраняются в **localStorage**, что позволяет сохранить избранный контент между сессиями, даже после перезагрузки страницы.

### Динамический поиск
- Возможность применения нескольких фильтров одновременно для поиска нужных фильмов, сериалов и мультфильмов.
- Динамическое обновление фильтров по мере выбора пользователем, что улучшает взаимодействие и упрощает поиск контента.

### API-запросы
- Получение данных о **фильмах, сериалах, мультфильмах**, включая подробную информацию о жанрах, странах, актерах, социальных сетях актеров, а также финансовых данных (затраты и доходы) для фильмов, мультфильмов и сериалов.
- Интеграция с **TMDb API** для получения актуальной информации о контенте.
- Запросы включают информацию о **трейлерах**, которые можно просматривать прямо в приложении.
- Поддержка получения данных о популярных фильмах, сериалах, мультфильмах, а также актуальных трендах и рекомендациях для пользователей.

### Производительность
- Использование ленивой загрузки (lazy loading) и пагинации помогает снизить нагрузку на сервер, улучшая производительность и ускоряя загрузку контента.

### Ответственность за UI/UX
- Приложение поддерживает современные принципы дизайна с акцентом на удобство пользователя.
- Модульность и переиспользуемость компонентов интерфейса с использованием **Vue.js** способствует более эффективной разработке и поддержке приложения.

## Архитектура

- **Vue.js** — основной фреймворк для создания гибких и масштабируемых интерфейсов.
- **Pinia** — для централизованного управления состоянием, включая избранное.
- **TMDb API** — для получения актуальных данных о фильмах, сериалах, мультфильмах, жанрах и странах.
- **Vue Router** — управление маршрутизацией приложения с поддержкой динамических фильтров в URL.
- **Lazy loading и пагинация** — обеспечивают оптимальную загрузку контента и улучшение производительности.
- **Компонентная архитектура** -- модульное построение интерфейса с выделением базовых компонентов (кнопки, модальные окна) и специализированных компонентов, таких как трейлеры и слайдеры для показа медиаконтента.

## Используемые технологии и библиотеки

- **Vue.js 3** — основной фреймворк для интерфейса.
- **Vue Router** — для маршрутизации приложения.
- **Pinia** — для управления состоянием (например, избранные фильмы, сериалы и мультфильмы).
- **Vite** — инструмент для быстрой сборки и разработки.
- **ESLint** — для статического анализа кода и поддержания качественного кода.
- **Splide** — для создания отзывчивых слайдеров с возможностью внешнего управления и настройки.
- **VueForm Multiselect** — для удобного мульти-выбора в фильтрах.
- **Fetch API** — для выполнения HTTP-запросов к API.
- **TMDb API** — для получения информации о фильмах, сериалах, мультфильмах, актерах.
- **localStorage** — используется для локального хранения данных о выбранных пользователем избранных фильмах. Обеспечивает сохранение состояния избранного между сессиями, позволяя загружать его при перезагрузке приложения.

## Установка и запуск проекта

### 1. Клонирование репозитория
Сначала клонируйте репозиторий и перейдите в директорию проекта:
```bash
git clone https://github.com/Fizz1eOut/CinemaFavorites.git
cd CinemaFavorites
```

## Настройка API ключей
Для работы с TMDb API создайте файл .env в корне проекта и добавьте ваш API ключ и базовый URL:
```sh
VITE_API_KEY=YOUR_API_KEY
VITE_BASE_URL=https://api.themoviedb.org/3/
```
Замените YOUR_API_KEY на ваш актуальный API-ключ из TMDb API.

### Запуск проекта
После установки зависимостей и настройки переменных окружения, запустите проект локально:
```sh
npm run dev
```
### 2. Откройте приложение: В браузере перейдите по адресу http://localhost:8080.
