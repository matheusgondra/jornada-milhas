import request from "supertest";
import app from "../../../../src/main/config/app";

describe("Cors Middleware", () => {
	it("Should enable CORS", async () => {
		app.get("/test-cors", (req, res) => {
			res.send();
		});
		await request(app)
			.get("/test-cors")
			.expect("Access-Control-Allow-Origin", "*")
			.expect("Access-Control-Allow-Headers", "*")
			.expect("Access-Control-Allow-Methods", "*");
	});
});
