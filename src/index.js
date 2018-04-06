import OSS from 'ali-oss'
import config from '../config.json'
let Buffer = OSS.Buffer
let OSSObject = OSS.Wrapper
let STS = OSSObject.STS

/*
let config = {
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: ''
}
*/
let client = new OSSObject(config)
let applyTokenDo = (func) => func(client)
let progress = (p) => (done) => {
  let bar = document.getElementById('progress-bar')
  bar.style.width = Math.floor(p * 100) + '%'
  bar.innerHTML = Math.floor(p * 100) + '%'
  done()
}
let uploadFile = (client) => {
  let file = document.getElementById('file').files[0]
  let key = document.getElementById('object-key-file').value.trim() || 'object'
  console.log(file.name + ' => ' + key)

  return client.multipartUpload(key, file, {
    progress: progress
  }).then(function (res) {
    console.log('upload success: %j', res)
    return listFiles(client)
  })
}
/*
let uploadContent = (client) => {
  let content = document.getElementById('file-content').value.trim()
  let key = document.getElementById('object-key-content').value.trim() || 'object'
  console.log('content => ' + key)

  return client.put(key, new Buffer(content)).then(function (res) {
    return listFiles(client)
  })
}

let listFiles = (client) => {
  let table = document.getElementById('list-files-table')
  console.log('list files')

  return client.list({
    'max-keys': 100
  }).then(function (result) {
    let objects = result.objects.sort(function (a, b) {
      let ta = new Date(a.lastModified)
      let tb = new Date(b.lastModified)
      if (ta > tb) return -1
      if (ta < tb) return 1
      return 0
    })

    let numRows = table.rows.length
    for (let i = 1; i < numRows; i++) {
      table.deleteRow(table.rows.length - 1)
    }

    for (let i = 0; i < Math.min(3, objects.length); i++) {
      let row = table.insertRow(table.rows.length)
      row.insertCell(0).innerHTML = objects[i].name
      row.insertCell(1).innerHTML = objects[i].size
      row.insertCell(2).innerHTML = objects[i].lastModified
    }
  })
}

let downloadFile = (client) => {
  let object = document.getElementById('dl-object-key').value.trim()
  let filename = document.getElementById('dl-file-name').value.trim()
  console.log(object + ' => ' + filename)

  let result = client.signatureUrl(object, {
    response: {
      'content-disposition': 'attachment filename="' + filename + '"'
    }
  })
  window.location = result

  return result
}
*/
window.onload = () => {
  document.getElementById('file-button').onclick = () => applyTokenDo(uploadFile)
  /*
  document.getElementById('content-button').onclick = function () {
    applyTokenDo(uploadContent)
  }

  document.getElementById('list-files-button').onclick = function () {
    applyTokenDo(listFiles)
  }

  document.getElementById('dl-button').onclick = function () {
    applyTokenDo(downloadFile)
  }
  applyTokenDo(listFiles)
  */
}
