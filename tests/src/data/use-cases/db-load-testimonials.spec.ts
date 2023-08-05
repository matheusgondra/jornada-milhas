import { LoadTestimonialsRepository } from "../../../../src/data/protocols/load-testimonials-repository";
import { DbLoadTestimonials } from "../../../../src/data/use-cases/db-load-testimonials";

const makeLoadTestimonialsRepositoryStub = (): LoadTestimonialsRepository => {
	class LoadTestimonialsRepositoryStub implements LoadTestimonialsRepository {
		async load(): Promise<LoadTestimonialsRepository.Result> {
			return [
				{
					id: 1,
					name: "any_name",
					photo: "any_photo",
					testimonial: "any_testimonial"
				}
			];
		}
	}
	return new LoadTestimonialsRepositoryStub();
};

interface SutTypes {
	sut: DbLoadTestimonials;
	loadTestimonialsRepositoryStub: LoadTestimonialsRepository;
}

const makeSut = (): SutTypes => {
	const loadTestimonialsRepositoryStub = makeLoadTestimonialsRepositoryStub();
	const sut = new DbLoadTestimonials({
		loadTestimonialsRepository: loadTestimonialsRepositoryStub
	});
	return {
		sut,
		loadTestimonialsRepositoryStub
	};
};

describe("DbLoadTestimonials", () => {
	it("Should call LoadTestimonialsRepository", async () => {
		const { sut, loadTestimonialsRepositoryStub } = makeSut();
		const loadSpy = jest.spyOn(loadTestimonialsRepositoryStub, "load");
		await sut.load();
		expect(loadSpy).toBeCalledTimes(1);
	});

	it("Should throw if LoadTestimonialsRepository throws", async () => {
		const { sut, loadTestimonialsRepositoryStub } = makeSut();
		jest
			.spyOn(loadTestimonialsRepositoryStub, "load")
			.mockReturnValueOnce(Promise.reject(new Error()));
		const promise = sut.load();
		await expect(promise).rejects.toThrow();
	});
});
