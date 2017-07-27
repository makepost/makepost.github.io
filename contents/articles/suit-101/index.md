---
title: Вступ до SUIT CSS
author: makepost
date: 2017-07-26 19:25
template: article.jade
---

[Принципи](https://github.com/suitcss/suit/blob/master/doc/design-principles.md), що лежать в основі SUIT CSS - методології, покликаної зробити приємнішим написання CSS у ході компонентно-орієнтованої розробки:

- **Модульність**: Кожен компонент зосереджений на чомусь одному і містить усе необхідне, аби втілити конкретну частину інтерфейсу користувача. Компонент може містити HTML, CSS, JavaScript та пов'язані ресурси, не роблячи припущень щодо контексту, зовнішнього відносно себе.

- **Слабка зв'язаність**: Компоненти не повинні напряму змінювати представлення або поведінку своїх залежностей. Слабка зв'язаність досягається завдяки використанню інтерфейсів та подій для комунікації між компонентами. Ізоляція більш важлива, ніж уникнення повторів віддалено схожого коду.

- **М'яка інкапсуляція**: Стилі компоненту не повинні впливати на HTML інших компонентів. HTML компоненту не повинен бути напряму включений в HTML іншого компоненту. Складність такого роду становить проблему для великих, адаптивних застосунків. Чим менше заплутані компоненти, тим простіше уявляти систему і робити про неї висновки.

## Компонент

SUIT CSS спирається на [структуровані імена класів](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md). Дефіси мають значення, а не лише розділяють слова. Це спрощує інкапсуляцію стилів і пояснення взаємодії класів іншим розробникам.

CSS, що відповідає за стиль компонента, має наступний синтаксис:

`<НазваКомпонента>[-назваНащадка][--назваМодифікатора]`

Це забезпечує кілька переваг при читанні й написанні HTML та CSS:

- Легше розрізняти класи компонента-кореня, елементів-нащадків і їхніх варіантів.

- Низька [специфічність](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/) селекторів.

- Семантика представлення окрема від семантики документа.

Назва компонента-кореня використовує PascalCase.

```css
.MyComponent { /* … */ }
```

```html
<article class="MyComponent">
  …
</article>
```

## Модифікатор

Модифікатор компонента - це клас, що змінює представлення базового компонента, наприклад для використання певної його конфігурації. Назва модифікатора повинна дотримувати camelCase і бути відокремленою від назви компонента двома дефісами. Клас потрібно включати в HTML разом із базовим класом компонента.

```css
/* Кнопка (стилі, спільні для всіх кнопок) */
.Button { /* … */ }

/* Типова кнопка */
.Button--default { /* … */ }
```

```html
<button class="Button Button--default" type="button">…</button>
```

## Нащадок

Нащадок компонента - це клас, що застосовує представлення напряму до нащадка компонента-кореня. Має дотримувати camelCase.

```html
<article class="Tweet">
  <header class="Tweet-header">
    <img class="Tweet-avatar" src="{{src}}" alt="{{alt}}">
    …
  </header>

  <div class="Tweet-bodyText">
    …
  </div>
</article>
```

## Утиліта

Низькорівневі структурні та позиційні типажі (англ. *traits, mixins*). Утиліти можна застосовувати до компонента або будь-якого його нащадка.

Синтаксис: `u-[sm-|md-|lg-]<назваУтиліти>`

Утиліти повинні використовувати camelCase. Ось приклад, як різні утиліти можна використовувати, щоб створити просту структуру в компоненті:

```html
<div class="u-cf">
  <a class="u-floatLeft" href="{{url}}">
    <img class="u-block" src="{{src}}" alt="">
  </a>

  <p class="u-sizeFill u-textBreak">
    …
  </p>
</div>
```

Адаптивні варіанти утиліт слід називати таким чином: `u-sm-<name>`, `u-md-<name>` і `u-lg-<name>` - для малих, середніх і великих екранів.

## BEM

Методологія ["Блок, елемент, модифікатор"](https://css-tricks.com/bem-101/) (BEM) - це популярна конвенція іменування класів HTML і CSS. Розроблена в Яндексі з метою допомогти розробникам краще розуміти відношення між HTML і CSS у проекті.

"Стандартний BEM" не є хорошим [вибором для міграцій](https://github.com/suitcss/suit/issues/80#issuecomment-46094932) (як та, що зараз триває у Twitter). Наприклад, блок `.menu` конфліктуватиме зі спадковим кодом меню, що не має ізольованої структури. Тоді як SUIT-назва `.Menu` не лише не створить такого конфлікту, а також більш очевидно співставиться з відповідним класом у JS.

Терміни SUIT, наприклад "компонент", звичні для користувачів фреймворків, таких як Angular і React. До того ж, імена компонентів JS/TS напряму збігаються з іменами компонентів CSS, написаних із дотриманням SUIT. По суті, [SUIT - це BEM](https://www.reddit.com/r/Frontend/comments/40y9l3/bem_vs_advanced_selectors/cyyhmzz/) із більш лаконічними й простими для читання конвенціями (`-` замість `__`).

## Абстракція

Матеріали про BEM підходять і для ілюстрації SUIT, якщо зважати на мінімальні відмінності в синтаксисі. Наприклад, поширеною помилкою в середовищі BEM/SUIT є [недостатня абстракція](https://css-tricks.com/bem-101/#comment-1593627) класів елементів-нащадків:

```css
/* Помилкове застосування SUIT */
.Accordion-title-icon.Accordion-title-iconFacebook {}

/* Коректніше - компонент "Значок" */
.Icon {}
.Icon--facebook {}

/* Коректніше - компонент "Акордеон" */
.Accordion {}
.Accordion-title {}
.Accordion-icon { /* CSS, який властивий лише тому значкові, що в акордеоні */ }
```

## Компонування

Компоненти SUIT (блоки BEM) потрібно розробляти таким чином, щоб їх можна було [вкладати](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/#8-how-to-nest-components) один в одного. Знову ж таки, з цим пов'язані деякі поширені помилки:

```html
<!-- Не ок -->
<article class="Card">
  <header class="Card-header">
    <h2 class="Card-title">Заголовок картки</h3>
  </header>

  <main class="Card-body">
    <p>Я хотів би придбати:</p>

    <!-- Овва! Вкладений компонент -->
    <ul class="Card-checklist">
      <li class="Card-checklist-item">
        <input id="option_1" type="checkbox" name="checkbox" class="Card-checklist-input">
        <label for="option_1" class="Card-checklist-label">Яблука</label>
      </li>
      <li class="Card-checklist-item">
        <input id="option_2" type="checkbox" name="checkbox" class="Card-checklist-input">
        <label for="option_2" class="Card-checklist-label">Груші</label>
      </li>
    </ul>
  </main>
</article>
```

Елементи-нащадки недостатньо абстрактні, що описано в розділі про абстракцію вище. А всі стилі, застосовані до `Card-checklist-item`, не вдасться перевикористати, бо вони специфічні саме для цього контексту - списку пунктів картки. Список і його елементи варто зробити окремими компонентами, що дозволить використання їх в інших місцях:

```html
<!-- Ок -->
<article class="Card">
  <header class="Card-header">
    <h2 class="Card-title">Заголовок картки</h3>
  </header>

  <main class="Card-body">
    <p>Я хотів би придбати:</p>

    <!-- Значно краще - компонент "Список" -->
    <ul class="List">
      <li class="List-item">
        <!-- Компонент "Прапорець", який можна повторно використовувати -->
        <div class="Checkbox">
          <input id="option_1" type="checkbox" name="checkbox" class="Checkbox-input">
          <label for="option_1" class="Checkbox-label">Яблука</label>
        </div>
      </li>

      <li class="List-item">
        <div class="Checkbox">
          <input id="option_2" type="checkbox" name="checkbox" class="Checkbox-input">
          <label for="option_2" class="Checkbox-label">Груші</label>
        </div>
      </li>
    </ul>
  </main>
</article>
```

## Як почати

Розгорнути новий проект на React із використанням TypeScript можна за допомогою [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript):

```
yarn global install create-react-app

create-react-app my-app --scripts-version=react-scripts-ts
cd my-app/
yarn start
```

Слід звернути увагу на [компонент App](https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/template/src/App.tsx) і [його стиль](https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/template/src/App.css) як на простий приклад застосування SUIT CSS на практиці.