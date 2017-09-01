const fs = require('fs')
const path = require('path')

main()

function main() {
  const file = path.join(__dirname, '..', 'config.json')
  const data = fs.readFileSync(file, 'utf-8')
  const config = JSON.parse(data)

  config.locals.description = description()

  const nextData = JSON.stringify(config, null, 2)
  fs.writeFileSync(file, nextData, 'utf-8')
}

function description() {
  const articles = fs.readdirSync(path.join(__dirname, '..', 'contents', 'articles'))
  const count = articles.length

  switch (plural(count)) {
    case 0:
      return `${count} річ, що переверне твоє уявлення про верстку`

    case 1:
      return `${count} речі, що перевернуть твоє уявлення про верстку`

    default:
      return `${count} речей, що перевернуть твоє уявлення про верстку`
  }
}

// http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
function plural(n) {
  return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
}