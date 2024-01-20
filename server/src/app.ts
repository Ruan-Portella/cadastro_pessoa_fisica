import express from "express";
import AppRouter from "./routes";
import cors from "cors";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json(
      {limit: '5mb'}
    ));
    this.app.use(cors({origin: 'http://localhost:5173',credentials: true}));
  }

  private routes(): void {
    this.app.use(AppRouter);
  }
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
