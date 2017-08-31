---
title: Соціальна мікророзмітка
author: makepost
date: 2017-08-31 23:25
template: article.jade
---

Користувачі [поширюють лінки](https://css-tricks.com/essential-meta-tags-social-media/) у соціальних мережах. Розробник сторінки може запропонувати мережам пов'язувати з нею певну картинку, заголовок, опис і доменне ім'я. Для цього передбачено декілька мета-тегів.

<span class="more"></span>

Facebook дотримується протоколу [Open Graph](http://ogp.me/). Існує чотири базові необхідні теги Open Graph:

```html
<meta property='og:title' content='Соціальна мікророзмітка' />
<meta property='og:description' content='Оформлення поширених лінків у соцмережах за допомогою мета-тегів.' />
<meta property='og:image' content='http://static3.uk.businessinsider.com/image/591969a93f9c9b20008b46db-480/bill-gates-windows-xp.jpg' />
<meta property='og:url' content='https://makepost.github.io/articles/social-tags/' />
```

На додачу до Open Graph, для Twitter потрібно вказати формат відображення:

```html
<meta name='twitter:card' content='summary_large_image' />
```

Заголовок повинен містити не більш як 70 символів.

Опис обмежений 200 символами. Зазвичай це 2-4 речення. Відрізняється від заголовка.

Картинка унікальна для кожної сторінки. Не логотип, не фото автора. Роздільність не менш як 1200x630, відношення сторін близько 1.91:1, розмір до 1 МБ.

URL канонічний, без змінних сесій, лічильників, ідентифікаторів користувача.

За допомогою [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/) і [Twitter Card Validator](https://cards-dev.twitter.com/validator) можна перевірити, чи містить сторінка коректні мета-теги.