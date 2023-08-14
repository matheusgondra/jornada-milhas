import { LoadTestimonialRepository } from "../../../../src/data/protocols";
import { DbLoadTestimonial } from "../../../../src/data/use-cases";

const makeLoadTestimonialRepositoryStub = (): LoadTestimonialRepository => {
	class LoadTestimonialRepositoryStub implements LoadTestimonialRepository {
		async loadById(
			testimonialId: LoadTestimonialRepository.Params
		): Promise<LoadTestimonialRepository.Result> {
			return {
				id: 1,
				name: "any_name",
				photo: "any_photo",
				testimonial: "any_testimonial"
			};
		}
	}
	return new LoadTestimonialRepositoryStub();
};

interface SutTypes {
	sut: DbLoadTestimonial;
	loadTestimonialRepositoryStub: LoadTestimonialRepository;
}

const makeSut = (): SutTypes => {
	const loadTestimonialRepositoryStub = makeLoadTestimonialRepositoryStub();
	const sut = new DbLoadTestimonial({
		loadTestimonialRepository: loadTestimonialRepositoryStub
	});
	return {
		sut,
		loadTestimonialRepositoryStub
	};
};

describe("DbLoadTestimonial", () => {
	it("Should call LoadTestimonialRepository", async () => {
		const { sut, loadTestimonialRepositoryStub } = makeSut();
		const loadSpy = jest.spyOn(loadTestimonialRepositoryStub, "loadById");
		await sut.load(1);
		expect(loadSpy).toBeCalledWith(1);
	});

	it("Should throw if LoadTestimonialRepository throws", async () => {
		const { sut, loadTestimonialRepositoryStub } = makeSut();
		jest
			.spyOn(loadTestimonialRepositoryStub, "loadById")
			.mockRejectedValueOnce(new Error());
		const promise = sut.load(1);
		await expect(promise).rejects.toThrow();
	});
});
