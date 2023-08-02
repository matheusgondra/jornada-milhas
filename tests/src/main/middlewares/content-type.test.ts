import request from "supertest";
import app from "../../../../src/main/config/app";

describe("Content Type Middleware", () => {
	it("Should return default type as json", async () => {
		app.get("/test-content-type", (req, res) => {
			res.send("");
		});
		await request(app)
			.get("/test-content-type")
			.expect("content-type", /json/);
	});
});
