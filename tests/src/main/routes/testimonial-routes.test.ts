import request from "supertest";
import app from "../../../../src/main/config/app";
import { PrismaHelper } from "../../../helpers/prisma-helper";

const makeFakeRequest = () => ({
	name: "John",
	photo: "imagem.png",
	testimonial: "Achei muito patetico"
});

describe("Testimonial Routes", () => {
	beforeEach(async () => {
		await PrismaHelper.connect();
	});

	afterEach(async () => {
		await PrismaHelper.disconnect();
	});

	describe("POST /depoimentos", () => {
		it("Should returns an testimonial on success", async () => {
			await request(app)
				.post("/depoimentos")
				.send(makeFakeRequest())
				.expect(201);
		});
	});

	describe("GET /depoimentos", () => {
		it("Should returns the testimonials on success", async () => {
			await request(app).post("/depoimentos").send(makeFakeRequest());

			const response = await request(app).get("/depoimentos");
			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual([
				{
					id: 1,
					...makeFakeRequest()
				}
			]);
		});
	});

	describe("GET /depoimentos/:testimonialId", () => {
		it("Should returns the testimonial on success", async () => {
			await request(app).post("/depoimentos").send(makeFakeRequest());

			const response = await request(app).get("/depoimentos/1");
			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual({
				id: 1,
				...makeFakeRequest()
			});
		});
	});

	describe("PATCH /depoimentos/:testimonialId", () => {
		it("Should returns 200 on success", async () => {
			await request(app).post("/depoimentos").send(makeFakeRequest());

			const response = await request(app).patch("/depoimentos/1").send({
				testimonial: "Achei Bom"
			});
			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual({
				id: 1,
				name: "John",
				photo: "imagem.png",
				testimonial: "Achei Bom"
			});
		});
	});

	describe("DELETE /depoimentos/:testimonialId", () => {
		it("Should returns 204 on success", async () => {
			await request(app).post("/depoimentos").send(makeFakeRequest());

			const response = await request(app).delete("/depoimentos/1");
			expect(response.statusCode).toBe(204);
		});
	});
});
