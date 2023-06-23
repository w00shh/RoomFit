const express = require("express");
const axios = require("axios");
const app = express();

const sqlite3 = require("sqlite3").verbose();
const dbPath = "./database.db";

const GOOGLE_CLIENT_ID =
  "#######";
const GOOGLE_CLIENT_SECRET = "#########";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/login/redirect";
const GOOGLE_SIGNUP_REDIRECT_URI =
  "http://localhost:3000/google-login/redirect";
const GOOGLE_TMP_SIGNUP_REDIRECT_URI = "http://localhost:3000/signup/redirect";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

//test
app.get("/", function (req, res) {
  res.send(`
<h1>Log in</h1>
<br>
<a href="/login">Log in</a>
<br>
<a href="/signup">Sign up</a>
<br>
<a href="/register">raw data register</a>
<br>
<a href="/google-login">Google Log in</a>
`);
});

app.get("/google-login", function (req, res) {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_SIGNUP_REDIRECT_URI}`;
  url += "&response_type=code";
  url += "&scope=email profile";
  res.redirect(url);
});

app.get("/google-login/redirect", async (req, res) => {
  const { code } = req.query;
  // access_token, refresh_token 등의 구글 토큰 정보 가져오기
  const resp = await axios.post(GOOGLE_TOKEN_URL, {
    // x-www-form-urlencoded(body)
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI,
    grant_type: "authorization_code",
  });
  // email, google id 등의 사용자 구글 계정 정보 가져오기
  const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
    // Request Header에 Authorization 추가
    headers: {
      Authorization: `Bearer ${resp.data.access_token}`,
    },
  });

  // 구글 인증 서버에서 json 형태로 반환 받은 body 클라이언트에 반환
  const { id, name, email } = resp2.data;
  const is_api = 1;
  console.log(id, name, email);

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Failed to connect to database:", err);
    } else {
      console.log("Connected to database");
    }
  });

  db.get("SELECT id FROM User WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("Failed to check email:", err);
      const response = {
        resultCode: 400,
        message: "회원가입에 실패했습니다. 다시 시도해주세요.",
      };
      res.status(400).json(response);
    } else {
      if (row > 2) {
        // 중복된 이메일이 존재함
        const response = {
          resultCode: 409,
          message: "이미 사용중인 이메일입니다.",
        };
        res.status(409).json(response);
      } else if (row == 1 && row.is_api != 1) {
        const response = {
          resultCode: 409,
          message: "이미 사용중인 이메일입니다.",
        };
        res.status(409).json(response);
      }
      if (row == undefined) {
        const sql = `INSERT INTO User (id, name, email, is_api) VALUES (?, ?, ?, ?)`;
        db.run(sql, [id, name, email, is_api], function (err) {
          if (err) {
            console.error("Failed to insert user:", err);
            const response = {
              resultCode: 400,
              message: "회원가입에 실패했습니다. 다시 시도해주세요.",
            };
            res.status(400).json(response);
          } else {
            const response = {
              message: "회원가입이 성공적으로 완료되었습니다.",
              user: {
                // 회원 정보
                resultCode: 200,
                id: id,
                name: name,
                email: email,
                is_api: is_api,
              },
            };
            res.status(200).json(response);
          }
        });
      } else {
        res.send("로그인 성공");
      } 
    }
  });
});

app.get("/login", function (req, res) {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  // client_id는 위 스크린샷을 보면 발급 받았음을 알 수 있음
  // 단, 스크린샷에 있는 ID가 아닌 당신이 직접 발급 받은 ID를 사용해야 함.
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  // 아까 등록한 redirect_uri
  // 로그인 창에서 계정을 선택하면 구글 서버가 이 redirect_uri로 redirect 시켜줌
  url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`;
  // 필수 옵션.
  url += "&response_type=code";
  // 구글에 등록된 유저 정보 email, profile을 가져오겠다 명시
  url += "&scope=email profile";
  // 완성된 url로 이동
  // 이 url이 위에서 본 구글 계정을 선택하는 화면임.
  res.redirect(url);
});

app.get("/login/redirect", (req, res) => {
  const { code } = req.query;
  console.log(`code: ${code}`);
  res.send("ok");
});

app.get("/signup", (req, res) => {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_TMP_SIGNUP_REDIRECT_URI}`;
  url += "&response_type=code";
  url += "&scope=email profile";
  res.redirect(url);
});

app.get("/signup/redirect", async (req, res) => {
  const { code } = req.query;
  console.log(`code: ${code}`);

  // access_token, refresh_token 등의 구글 토큰 정보 가져오기
  const resp = await axios.post(GOOGLE_TOKEN_URL, {
    // x-www-form-urlencoded(body)
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_TMP_SIGNUP_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  // email, google id 등의 사용자 구글 계정 정보 가져오기
  const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
    // Request Header에 Authorization 추가
    headers: {
      Authorization: `Bearer ${resp.data.access_token}`,
    },
  });

  // 구글 인증 서버에서 json 형태로 반환 받은 body 클라이언트에 반환
  const { id, name, email } = resp2.data;
  console.log(id, name, email);
  res.json(resp2.data);
});

app.get("/register", function (req, res) {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Failed to connect to database:", err);
    } else {
      console.log("Connected to database");
    }
  });

  //   const { id, name, email, password, birthday, gender, is_api } = req.body;
  //   raw data test
  id = "jerry7780";
  name = "정우석";
  email = "jerry7780@naver.com";
  password = "abcd1234!";
  birthday = "1995-07-01";
  gender = "0";
  is_api = "0";

  // 유효성 검사
  //   const id_regex = /^[a-zA-Z0-9]+$/;
  //   if (id.length < 6 || id.length > 12 || !id_regex.test(id)) {
  //     const response = {
  //       resultCode: 400,
  //       message: "잘못된 아이디 형식입니다.",
  //     };
  //     res.status(400).json(response);
  //   }
  //   const name_regex = /^[가-힣]+$/;
  //   if (name.length < 2 || name.length > 5 || !name_regex.test(name)) {
  //     const response = {
  //       resultCode: 400,
  //       message: "잘못된 이름 형식입니다.",
  //     };
  //     res.status(400).json(response);
  //   }
  const email_regx = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/;
  if (!email_regx.test(email)) {
    const response = {
      resultCode: 400,
      message: "잘못된 이메일 형식입니다.",
    };
    res.status(400).json(response);
  }
  const password_regx =
    /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[0-9]).{6,12}$/;
  if (
    password.length < 8 ||
    password.length > 16 ||
    !password_regx.test(password)
  ) {
    const response = {
      resultCode: 400,
      message: "잘못된 비밀번호 형식입니다.",
    };
    res.status(400).json(response);
  }

  // sql 중복검사
  db.get("SELECT id FROM User WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("Failed to check email:", err);
      const response = {
        resultCode: 400,
        message: "회원가입에 실패했습니다. 다시 시도해주세요.",
      };
      res.status(400).json(response);
    } else {
      if (row) {
        // 중복된 이메일이 존재함
        const response = {
          resultCode: 409,
          message: "이미 사용중인 이메일입니다.",
        };
        res.status(409).json(response);
      }
    }
  });
  db.get("SELECT id FROM User WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Failed to check ID:", err);
      const response = {
        resultCode: 400,
        message: "회원가입에 실패했습니다. 다시 시도해주세요.",
      };
      res.status(400).json(response);
    } else {
      if (row) {
        // 중복된 아이디가 존재함
        const response = {
          resultCode: 409,
          message: "이미 사용중인 아이디입니다.",
        };
        res.status(409).json(response);
      }
    }
  });

  //회원가입 시도
  const sql = `INSERT INTO User (id, name, email, password, birth, gender, is_api) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(
    sql,
    [id, name, email, password, birthday, gender, is_api],
    function (err) {
      if (err) {
        console.error("Failed to insert user:", err);
        const response = {
          resultCode: 400,
          message: "회원가입에 실패했습니다. 다시 시도해주세요.",
        };
        res.status(400).json(response);
      } else {
        const response = {
          message: "회원가입이 성공적으로 완료되었습니다.",
          user: {
            // 회원 정보
            resultCode: 200,
            id: id,
            name: name,
            email: email,
            password: password,
            birthday: birthday,
            gender: gender,
            is_api: is_api,
          },
        };
        res.status(200).json(response);
      }
    }
  );
  db.close();
});

app.listen(3000, () => console.log("3000번 포트 대기"));
