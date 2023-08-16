import { UpdateTestimonialRepository } from "../../../../src/data/protocols";
import { DbUpdateTestimonial } from "../../../../src/data/use-cases";

const makeUpdateTestimonialRepositoryStub = (): UpdateTestimonialRepository => {
	class UpdateTestimonialRepositoryStub
		implements UpdateTestimonialRepository
	{
		async update(
			data: UpdateTestimonialRepository.Params
		): Promise<UpdateTestimonialRepository.Result> {
			return {
				id: 1,
				name: "any_name",
				testimonial: "any_testimonial",
				photo: "any_photo"
			};
		}
	}
	return new UpdateTestimonialRepositoryStub();
};

interface SutTypes {
	sut: DbUpdateTestimonial;
	updateTestimonialRepositoryStub: UpdateTestimonialRepository;
}

const makeSut = (): SutTypes => {
	const updateTestimonialRepositoryStub =
		makeUpdateTestimonialRepositoryStub();
	const sut = new DbUpdateTestimonial({
		updateTestimonialRepository: updateTestimonialRepositoryStub
	});
	return {
		sut,
		updateTestimonialRepositoryStub
	};
};

const makeFakeData = () => ({
	testimonialId: 1,
	data: {
		testimonial: "any_testimonial",
		photo: "any_photo"
	}
});

describe("DbUpdateTestimonial", () => {
	it("Should call UpdateTestimonialRepository with correct values", async () => {
		const { sut, updateTestimonialRepositoryStub } = makeSut();
		const updateSpy = jest.spyOn(updateTestimonialRepositoryStub, "update");
		await sut.update(makeFakeData());
		expect(updateSpy).toHaveBeenCalledWith(makeFakeData());
	});

	it("Should throw if UpdateTestimonialRepository throws", async () => {
		const { sut, updateTestimonialRepositoryStub } = makeSut();
		jest
			.spyOn(updateTestimonialRepositoryStub, "update")
			.mockRejectedValueOnce(new Error());
		const promise = sut.update(makeFakeData());
		await expect(promise).rejects.toThrow();
	});
});
