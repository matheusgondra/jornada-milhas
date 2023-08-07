import { TestimonialRepository } from "../../../../../src/infra/db/postgresql/testimonial-repository";
import { PrismaHelper } from "../../../../helpers/prisma-helper";

describe("TestimonialRepository", () => {
	beforeEach(async () => {
		await PrismaHelper.connect();
	});

	afterEach(async () => {
		await PrismaHelper.disconnect();
	});

	const makeFakeData = () => ({
		name: "any_name",
		photo: "any_photo",
		testimonial: "any_testimonial"
	});

	const makeSut = (): TestimonialRepository => {
		return new TestimonialRepository();
	};

	describe("AddTestimonial", () => {
		it("Should return a testimonial on success", async () => {
			const sut = makeSut();
			const testimonial = await sut.add(makeFakeData());
			expect(testimonial).toEqual({
				id: 1,
				...makeFakeData()
			});
		});
	});

	describe("LoadTestimonials", () => {
		it("Should return the testimonials on success", async () => {
			const sut = makeSut();
			await sut.add(makeFakeData());
			const testimonials = await sut.load();
			expect(testimonials).toEqual([
				{
					id: 1,
					...makeFakeData()
				}
			]);
		});
	});
});
