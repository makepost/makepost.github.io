---
title: Підключення шрифтів
author: makepost
date: 2017-07-27 21:21
template: article.jade
---

[CSS може стати дещо безладним](http://www.456bereastreet.com/archive/201012/font-face_tip_define_font-weight_and_font-style_to_keep_your_css_simple/), якщо насиченості й стилі підключених шрифтів не вказані коректно в оголошеннях `@font-face`. На жаль, деякі туторіали і сервіси підключення шрифтів не оголошують `@font-face` як слід. Розгляньмо проблему на прикладі можливого варіанту підключення шрифта Open Sans:

<span class="more"></span>

```css
/* Не ок */

@font-face {
  font-family: 'Open Sans Regular';
  src: url('OpenSans-Regular-webfont.ttf') format('truetype');
}

@font-face {
  font-family: 'Open Sans Italic';
  src: url('OpenSans-Italic-webfont.ttf') format('truetype');
}

@font-face {
  font-family: 'Open Sans Bold';
  src: url('OpenSans-Bold-webfont.ttf') format('truetype');
}

@font-face {
  font-family: 'Open Sans Bold Italic';
  src: url('OpenSans-BoldItalic-webfont.ttf') format('truetype');
}
```

За такого CSS, окрема назва шрифта оголошується для кожної насиченості й стилю, через що доводиться писати такий код:

```css
body {
  font-family: 'Open Sans Regular', sans-serif;
}

h1 {
  font-family: 'Open Sans Bold', sans-serif;
  font-weight: normal;
}

em {
  font-family: 'Open Sans Italic', sans-serif;
  font-weight: normal;
  font-style: normal;
}

strong em {
  font-family: 'Open Sans Bold Italic', sans-serif;
  font-weight: normal;
  font-style: normal;
}
```

Щоразу, змінюючи стиль елементу, розробник буде повинен скидати успадковані стилі, інакше браузер намагатиметься імітувати ефект грубості чи курсиву власноруч, замість того щоб використовувати їхню реалізацію від автора шрифту. А якщо браузер користувача не підтримує розміщений на сайті формат шрифтів або трапилася помилка при їхньому завантаженні, текст не матиме очікуваних грубості й курсиву.

До того ж, зростає ризик випадково не вказати для того чи іншого елемента [стандартний шрифт](https://developers.google.com/fonts/docs/getting_started#overview), наприклад `serif` або `sans-serif`, що може спричинити додаткову неочікувану поведінку браузера у разі помилки завантаження.

Зайвого CSS писати не доведеться, якщо вказати `font-weight` і `font-style` у кожному правилі `@font-face` відповідно до властивостей шрифта і використати єдиний `font-family` для всіх шрифтів однієї гарнітури:

```css
/* Ок */

@font-face {
  font-family: 'Open Sans';
  src: url('OpenSans-Regular-webfont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Open Sans';
  src: url('OpenSans-Italic-webfont.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'Open Sans';
  src: url('OpenSans-Bold-webfont.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Open Sans';
  src: url('OpenSans-BoldItalic-webfont.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}
```

Тепер можна покластися на спадкування `font-family` і не потрібно щоразу повертати `font-weight` і `font-style` до початкових значень:

```css
body {
  font-family: 'Open Sans', sans-serif;
}

h1,
strong {
  font-weight: bold;
}

em {
  font-style: italic;
}
```

До речі, [Open Sans](https://fonts.google.com/specimen/Open+Sans), як і деякі інші поширені шрифти, доступний для підключення з Google Fonts і його можливо не розміщувати на власному сервері. Тобто, замість вказаних вище `@font-face` у CSS, достатньо розмістити у `<head />` лінк на стиль:

```html
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=cyrillic" rel="stylesheet" />
```