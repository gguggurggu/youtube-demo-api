const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());

let db = new Map();
var id = 1;

//회원가입
app.post("/join", (req, res) => {
  if (JSON.stringify(req.body) === "{}") {
    res.status(400).json({
      message: "입력값을 다시 확인해주세요.",
    });
  } else {
    db.set(id++, req.body);
    var userName = db.get(id - 1).name;

    res.status(201).json({
      message: `${userName} 님, 환영합니다.`,
    });
  }
});

//로그인
app.post("/login", (req, res) => {
  if (req.body.id && req.body.pwd) {
    res.json({
      message: `${userName} 님, 환영합니다.`,
    });
  } else {
    res.status(404).json({
      message: "없는 아이디 또는 비밀번호입니다. 회원가입이 필요합니다.",
    });
  }
});

//회원 개별 조회
app.get("/users/:id", (req, res) => {
  if (req.body.id && req.body.pwd && req.body.userName) {
    res.json({
      message: `${userName} 님, 환영합니다.`,
    });
  }
});

//회원 개별 탈퇴
app.post("/users/:id", (req, res) => {
  if (req.body.id) {
    res.json({
      message: `${userName} 님, 또 뵙겠습니다.`,
    });
  }
});
