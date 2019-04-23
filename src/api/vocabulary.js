const fs = require('fs')

/**
 * 写入单词本
 * @param {Object} word
 */
 function writeVocabulary(word) {
  const vocabularyPath = 'vocabulary.json'
  return new Promise((resolve, reject) => {
    fs.readFile(vocabularyPath, 'utf8', (err, data) => {
      if (err) {
        // 错误表示文件不存在
        console.log(err)
      }
      if (data) {
        data = JSON.parse(data)
        if (Object.keys(data).includes(Object.keys(word)[0])) {
          resolve(2) // 单词本已经存在该单词
        }
      }
      // 将数据写入文件
      fs.writeFile(vocabularyPath, JSON.stringify(Object.assign({}, data, word)), err => {
        if (err) {
          throw err
        }
        resolve(1) // 添加成功
      })
    })
  })
}

module.exports = {
  writeVocabulary: writeVocabulary
}
