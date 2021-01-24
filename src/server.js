const express = require('express')
const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/avatar/'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
   
    cb(null, file.originalname + '.jpg'); // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});
const upload = multer({ storage: storage });
const app = express()
const port = 4010

app.get('/', (req, res) => { // get 메소드 일때,
  res.send('Hello World!')  //  응답 보내기
})
app.get('/image', function (req, res) {
  res.sendFile(path.resolve(__dirname, `../data/avatar/${req.query.fn}.jpg`));
});

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
  try {
    return res.send('OK');
  } catch (err) {}
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})