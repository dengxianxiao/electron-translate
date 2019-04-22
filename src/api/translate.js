const axios = require('axios')

// 金山词霸翻译地址
const kingsoftUrl = 'http://fy.iciba.com/ajax.php'

async function translateAPI(from, to, words) {
  if (!from || !to || !words) {
    console.error('翻译参数不能为空')
    return
  }
  let params = `?a=fy&f=${from}&t=${to}&w=${words}`
  try {
    const res = await axios.get(kingsoftUrl + params)
    return res
  } catch (error) {
    console.error(error)
    alert('服务器出错了')
  }
}

module.exports = {
  translateAPI: translateAPI
}
