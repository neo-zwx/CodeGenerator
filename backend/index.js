//後端Express路由
const express = require('express');
const cors = require('cors');
const app = express();// Create an Express app
const port = 3002; // 服務器端口


app.use(cors());
app.use(express.json());
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zwx890829!",
    database: "codegeneration",
    port: 3306,
  });

// 建立數據庫連接
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL 已連接...');
});

// 定義一個簡單的路由來測試 API
app.get('/', (req, res) => {
  res.send('API 正在運行...');
});


app.get('/api/templates', (req, res) => {
  const sqlQuery = 'SELECT * FROM templates';
  db.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.get('/api/templates/:id', (req, res) => {
  const { id } = req.params; // 從 URL 中獲取 id
  const sqlQuery = 'SELECT * FROM templates WHERE id = ?';

  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Database query error');
      return;
    }

    if (result.length > 0) {
      res.json(result[0]); // 返回找到的第一條記錄
    } else {
      res.status(404).send('Template not found');
    }
  });
});

// app.get('/api/templates', (req, res) => {
//   const { name, type } = req.query;

//   const sqlQuery = 'SELECT * FROM templates WHERE template_name = ? AND template_type = ?';

//   db.query(sqlQuery, [name, type], (err, results) => {
//     if (err) {
//       console.error('數據庫查詢錯誤:', err);
//       res.status(500).send('伺服器錯誤');
//       return;
//     }

//     if (results.length > 0) {
//       res.json(results);
//     } else {
//       res.status(404).send('未找到相符的模板');
//     }
//   });
// });

app.post("/api/addtemplate", (req, res) => {
    const q = "INSERT INTO templates(`template_name`, `template_language`, `template_type`, `template_data`) VALUES (?,?,?,?)";
  
    const values = [
      req.body.template_name,
      req.body.template_language,
      req.body.template_type,
      req.body.template_data,
    ];
  
    db.query(q, values, (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.delete("/deletetemplate/:id", (req, res) => {
    const templateId = req.params.id;
    const q = " DELETE FROM templates WHERE id = ? ";
  
    db.query(q, [templateId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


  app.put("/api/updatetemplate/:id", (req, res) => {
    const templateId = req.params.id;
    const q = "UPDATE templates SET `template_name`=?, `template_language`=?, `template_type`=?, `template_data`=? WHERE id = ? ";

    const values = [
      req.body.template_name,
      req.body.template_language,
      req.body.template_type,
      req.body.template_data,
    ];
  
    db.query(q, [...values,templateId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


  app.get("/api/readfeedback", (req, res) => {
    const q = "SELECT * FROM feedback";
    db.query(q, (err, data) => {
        if (err) {
        console.log(err);
        return res.json(err);
        }
        return res.json(data);
    });
  });
  


app.post("/api/feedback", (req, res) => {
  const q = "INSERT INTO feedback(`Name`, `Email`, `Template`, `Comment`) VALUES (?,?,?,?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.template,
    req.body.comment,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器正在監聽端口 ${port}`);
});




