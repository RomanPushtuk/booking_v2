import { Express } from "express";
import cors from "cors";

export const useCors = (app: Express) => {
	app.use(cors({
		origin: ['http://localhost:5173']
	}))
}
