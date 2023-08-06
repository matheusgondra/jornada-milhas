import { TestimonialRepository } from "../../../../../src/infra/db/postgresql/testimonial-repository";
import { PrismaHelper } from "../../../../helpers/prisma-helper";

describe("TestimonialRepository", () => {
	beforeAll(async () => {
		await PrismaHelper.connect();
	});

	afterAll(async () => {
		await PrismaHelper.disconnect();
	});

	const makeSut = (): TestimonialRepository => {
		return new TestimonialRepository();
	};

	it("Should return a testimonial on success", async () => {
		const sut = makeSut();
		const data = {
			name: "any_name",
			photo: "any_photo",
			testimonial: "any_testimonial"
		};
		const testimonial = await sut.add(data);
		expect(testimonial).toEqual({
			id: expect.any(Number),
			...data
		});
	});
});
