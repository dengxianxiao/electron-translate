const { translateAPI, translateDetailAPI } = require('./src/api/translate')
const { writeVocabulary } = require('./src/api/vocabulary')

const ZH = 'zh'
const EN = 'en'
let translateType = `${EN}-${ZH}`
let currentWord = '' // 当前要翻译的词
let currentTranslate = [] // 当前翻译的结果

// 绑定翻译类型按钮
let fromTo = document.getElementById('from-to')
let toFrom = document.getElementById('to-from')
fromTo.addEventListener('click', changeTranslateType)
toFrom.addEventListener('click', changeTranslateType)
function changeTranslateType(event) {
  fromTo.className = fromTo.className.replace(/is-primary/, '')
  toFrom.className = toFrom.className.replace(/is-primary/, '')
  event.target.className += ' is-primary'
  translateType = `${ZH}-${EN}`
  if (event.target.id === 'from-to') {
    translateType = `${EN}-${ZH}`
  }
}

// 绑定翻译按钮
let inputType = document.getElementById('words')
inputType.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    translateWords()
  }
})
let translateBtn = document.getElementById('translate-button')
translateBtn.addEventListener('click', translateWords)
function translateWords() {
  let translateTypeArr = translateType.split('-')
  let from = translateTypeArr[0]
  let to = translateTypeArr[1]
  let words = document.getElementById('words').value
  currentWord = words

  if (!from || !to || !words) {
    console.error('翻译参数不能为空')
    alert('翻译参数不能为空')
    return
  }
  translateAPI(from.trim(), to.trim(), words.trim()).then(res => {
    console.log(res)
    // 处理返回的翻译结果
    let detail = document.getElementById('translate-explain')
    let list = []
    list = res.data.content.word_mean || [res.data.content.out]
    currentTranslate = list
    let ul = document.getElementById('translate-explain')
    let lis = ul.getElementsByTagName('li')
    // 清空上一次翻译的内容
    Array.from(lis).forEach(li => ul.removeChild(li))
    // 添加翻译内容
    list.forEach(element => {
      let li = document.createElement('li')
      li.innerText = element
      ul.appendChild(li)
    })

    // 显示查看更多按钮
    let seeMore = document.getElementById('js-is-show-detail')
    seeMore.style.opacity = 1

    // 查看明细
    seeMoreDetail()
  })
}

// 查看更多翻译明细
function seeMoreDetail() {
  if (currentWord) {
    translateDetailAPI(currentWord).then(res => {
      console.log(res)
      let ol = document.getElementById('translate-sentence')
      let lis = ol.getElementsByTagName('li')
      // 清空上一次翻译的内容
      Array.from(lis).forEach(li => ol.removeChild(li))
      ol.type='1'
      let sentences = res.data.sentence
      if (sentences) {
        sentences.forEach(sen => {
          let li = document.createElement('li')
          let div1 = document.createElement('div')
          div1.innerText = sen.Network_en
          li.appendChild(div1)
          let div2 = document.createElement('div')
          div2.innerText = sen.Network_cn
          li.appendChild(div2)
          ol.appendChild(li)
        })
      }
    })
  }
}

// 绑定添加单词本按钮
let addButton = document.getElementById('add-img')
addButton.addEventListener('click', addVocabulary)
function addVocabulary() {
  if (currentWord && currentTranslate) {
    let obj = {}
    obj[currentWord] = currentTranslate
    let a = writeVocabulary(obj)
    console.log(a)
    // .then(res => {
    //   alert('添加成功')
    // })
  }
}
