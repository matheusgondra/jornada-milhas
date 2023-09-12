import { TestimonialRepository } from "../../../../../src/infra/db";
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

		it("Should return empty array if testimonials not exists", async () => {
			const sut = makeSut();
			const testimonials = await sut.load();
			expect(testimonials).toEqual([]);
		});
	});

	describe("LoadTestimonial", () => {
		it("Should return a testimonial on success", async () => {
			const sut = makeSut();
			await sut.add(makeFakeData());
			const testimonial = await sut.loadById(1);
			expect(testimonial).toEqual({
				id: 1,
				...makeFakeData()
			});
		});

		it("Should return null if testimonial not exists", async () => {
			const sut = makeSut();
			await sut.add(makeFakeData());
			const testimonial = await sut.loadById(2);
			expect(testimonial).toBeNull();
		});
	});

	describe("UpdateTestimonial", () => {
		it("Should return a testimonial updated on success", async () => {
			const sut = makeSut();
			await sut.add(makeFakeData());
			const testimonial = await sut.update({
				testimonialId: 1,
				data: {
					photo: "new_photo",
					testimonial: "new_testimonial"
				}
			});
			expect(testimonial).toEqual({
				id: 1,
				name: "any_name",
				photo: "new_photo",
				testimonial: "new_testimonial"
			});
		});
	});

	describe("DeleteTestimonial", () => {
		it("Should return true on success", async () => {
			const sut = makeSut();
			await sut.add(makeFakeData());
			const deleted = await sut.delete(1);
			expect(deleted).toBe(true);
		});
	});
});
