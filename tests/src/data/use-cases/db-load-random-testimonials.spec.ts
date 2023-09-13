import { LoadTestimonialsRepository } from "../../../../src/data/protocols";
import { DbLoadRandomTestimonials } from "../../../../src/data/use-cases";

const makeLoadTestimonialsRepository = (): LoadTestimonialsRepository => {
	class LoadTestimonialsRepositoryStub implements LoadTestimonialsRepository {
		async load(): Promise<LoadTestimonialsRepository.Result> {
			return [
				{
					id: 1,
					name: "any_name",
					photo: "any_photo",
					testimonial: "any_testimonial"
				},
				{
					id: 2,
					name: "any_name",
					photo: "any_photo",
					testimonial: "any_testimonial"
				},
				{
					id: 3,
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
	sut: DbLoadRandomTestimonials;
	loadTestimonialsRepositoryStub: LoadTestimonialsRepository;
}

const makeSut = (): SutTypes => {
	const loadTestimonialsRepositoryStub = makeLoadTestimonialsRepository();
	const sut = new DbLoadRandomTestimonials({
		loadTestimonialsRepository: loadTestimonialsRepositoryStub
	});
	return {
		sut,
		loadTestimonialsRepositoryStub: loadTestimonialsRepositoryStub
	};
};

describe("DbLoadRandomTestimonials", () => {
	it("Should call LoadTestimonials", async () => {
		const { sut, loadTestimonialsRepositoryStub } = makeSut();
		const loadSpy = jest.spyOn(loadTestimonialsRepositoryStub, "load");
		await sut.load();
		expect(loadSpy).toBeCalledTimes(1);
	});
});
