---
title: Форматування коду
author: makepost
date: 2017-07-26 16:33
template: article.jade
---

[morishitter](https://github.com/morishitter/stylefmt/blob/master/README.md) про автоматично форматований код:

- легше **писати** : не треба відволікатися на форматування.

- легше **читати** : коли увесь код виглядає однаково, не доводиться подумки конвертувати стиль форматування інших у щось звичне собі.

- легше **супроводжувати** : редагування сирців не зачіпає форматування існуючого коду; diff показує тільки реальні правки.

- **не спричиняє суперечок** : більше жодних дебатів про відступи і позицію дужок!

## CSS

Встановлюємо `stylefmt`:

```
yarn add -D stylefmt
```

Додаємо скрипт у `package.json`:

```
"lint-fix": "stylefmt -r 'src/**/*.css'"
```

## JavaScript

Встановлюємо `standard`:

```
yarn add -D standard
```

Змінюємо скрипт у `package.json`:

```
"lint-fix": "standard --fix 'src/**/*.js' && stylefmt -r 'src/**/*.css'"
```

## TypeScript

Встановлюємо `tslint`:

```
yarn add -D tslint
```

Створюємо `tslint.json`:

```
{
  "extends": [
    "tslint:latest"
  ]
}
```

Змінюємо скрипт у `package.json`:

```
"lint-fix": "tslint --fix 'src/**/*.ts' && stylefmt -r 'src/**/*.css'"
```

## Запуск

Сирці розміщуємо в `src/` або її підтеках. Автоформатування коду робимо перед кожним комітом:

```
yarn lint-fix && git add . && git commit -m "Add new scripts"
```

Лінтер знаходить помилки і намагається їх виправити. Якщо йому щось не вдається, він вказує на місця, що потребують ручного втручання.