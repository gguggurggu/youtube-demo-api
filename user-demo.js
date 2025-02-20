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
    const userName = db.get(id - 1).name;

    res.status(201).json({
      message: `${userName} 님, 환영합니다.`,
    });
  }
});

//로그인
app.post("/login", (req, res) => {
  const { userId, password } = req.body;
  var loginUser = "";

  db.forEach((user, id) => {
    if (user.userId === userId) {
      loginUser = user;
    }
  });

  if (loginUser) {
    if (loginUser.password === password) {
      res.json({
        message: `${loginUser.name} 님, 환영합니다.`,
      });
    } else {
      res.status(404).json({
        message: "비밀번호를 다시 입력해 주세요.",
      });
    }
  } else {
    res.status(404).json({
      message: "아이디를 다시 입력해 주세요.",
    });
  }
});

//route로 묶어주기
app
  .route("/users/:id")
  .get((req, res) => {
    //회원 개별 조회
    let { id } = req.params;
    id = parseInt(id);
    const user = db.get(id);

    if (user == undefined) {
      res.status(404).json({
        message: "회원 정보가 없습니다.",
      });
    } else {
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    }
  })
  .delete((req, res) => {
    //회원 탈퇴
    let { id } = req.params;
    id = parseInt(id);
    const user = db.get(id);

    if (user == undefined) {
      res.status(404).json({
        message: "회원 정보가 없습니다.",
      });
    } else {
      db.delete(id);

      res.status(200).json({
        message: `${user.name} 님, 또 뵙겠습니다.`,
      });
    }
  });
