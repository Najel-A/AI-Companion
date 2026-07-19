import "dotenv/config";
import app from "./src/app";

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`Frost backend listening on http://localhost:${PORT}`);
});
