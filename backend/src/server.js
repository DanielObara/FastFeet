import app from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log('✔️  Server runs on http://localhost:3333');
});
