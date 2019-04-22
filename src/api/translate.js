const axios = require('axios')

// 金山词霸翻译地址
const kingsoftTranslateUrl = 'http://fy.iciba.com/ajax.php'
const kingsoftDetailUrl = 'http://www.iciba.com/index.php'

async function translate(from, to, words) {
  if (!from || !to || !words) {
    console.error('翻译参数不能为空')
    return
  }
  let params = `?a=fy&f=${from}&t=${to}&w=${words}`
  try {
    const res = await axios.get(kingsoftTranslateUrl + params)
    return res
  } catch (error) {
    console.error(error)
    alert('服务器出错了')
  }
}

async function translateDetail(words) {
  if (!words) {
    console.error('翻译参数不能为空')
    return
  }
  let params = `?a=getWordMean&c=search&list=3&word=${words}`
  try {
    const res = await axios.get(kingsoftDetailUrl + params)
    return res
  } catch (error) {
    console.error(error)
    alert('服务器出错了')
  }
}

module.exports = {
  translateAPI: translate,
  translateDetailAPI: translateDetail
}
