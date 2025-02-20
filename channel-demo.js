const express = require("express");
const { debugPort } = require("node:process");
const app = express();
app.listen(3000);
app.use(express.json());

let db = new Map();
var id = 1;

app
  .route("/channels")
  //채널 전체 조회
  .get((req, res) => {
    var channels = [];

    if (db.size) {
      db.forEach((value, key) => {
        channels.push(value);
      });

      res.status(200).json(channels);
    } else {
      res.status(404).json({
        message: `조회할 채널이 없습니다.`,
      });
    }
  })
  //채널 개별 생성
  .post((req, res) => {
    if (req.body.channelTitle) {
      db.set(id++, req.body);
      const channelTitle = db.get(id - 1).channelTitle;

      res.status(201).json({
        message: `${channelTitle} 채널을 응원합니다.`,
      });
    } else {
      res.status(400).json({
        message: `채널명을 입력해 주세요.`,
      });
    }
  });

app
  .route("/channels/:id")
  //채널 개별 조회
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    var channel = db.get(id);

    if (channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({
        message: `채널 정보를 찾을 수 없습니다.`,
      });
    }
  })
  //채널 개별 수정
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    var channel = db.get(id);

    if (!channel) {
      return res.status(404).json({
        message: `채널 정보를 찾을 수 없습니다.`,
      });
    }

    const oldChannelTitle = channel.channelTitle;
    const newChannelTitle = req.body.channelTitle;

    if (!newChannelTitle || newChannelTitle.trim() === "") {
      return res.status(400).json({
        message: "유효한 채널명을 입력해주세요.",
      });
    }

    channel.channelTitle = newChannelTitle;

    db.set(id, channel);

    return res.status(200).json({
      message: `채널명이 ${oldChannelTitle}에서 ${newChannelTitle}로 정상적으로 변경되었습니다.`,
    });
  })
  //채널 개별 삭제
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    var channel = db.get(id);

    if (channel) {
      const channelTitle = channel.channelTitle;
      db.delete(id);

      res.status(200).json({
        message: `${channelTitle} 채널이 정상적으로 삭제되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: `채널 정보를 찾을 수 없습니다.`,
      });
    }
  });
