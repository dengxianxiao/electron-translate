const { translateAPI } = require('./src/api/translate')

let translateBtn = document.getElementById('translate-button')
translateBtn.addEventListener('click', translateWords)

function translateWords() {
  let from = 'en'
  let to = 'zh'
  let words = document.getElementById('words').value

  if (!from || !to || !words) {
    console.error('翻译参数不能为空')
    alert('翻译参数不能为空')
  }
  translateAPI(from.trim(), to.trim(), words.trim()).then(res => {
    console.log(res)
    let detail = document.getElementById('translate-explain')
    detail.innerText = res.data.content.word_mean
  })
}
