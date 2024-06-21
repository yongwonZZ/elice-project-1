// 에러 핸들러 및 서버 시작 코드
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
