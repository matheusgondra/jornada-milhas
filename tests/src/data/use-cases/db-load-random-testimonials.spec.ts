import { LoadRandomTestimonialsRepository } from "../../../../src/data/protocols";
import { DbLoadRandomTestimonials } from "../../../../src/data/use-cases";

const makeLoadRandomTestimonialsRepository =
	(): LoadRandomTestimonialsRepository => {
		class LoadRandomTestimonialsRepositoryStub
			implements LoadRandomTestimonialsRepository
		{
			async load(): Promise<LoadRandomTestimonialsRepository.Result> {
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
		return new LoadRandomTestimonialsRepositoryStub();
	};

interface SutTypes {
	sut: DbLoadRandomTestimonials;
	loadRandomTestimonialsRepositoryStub: LoadRandomTestimonialsRepository;
}

const makeSut = (): SutTypes => {
	const loadRandomTestimonialsRepositoryStub =
		makeLoadRandomTestimonialsRepository();
	const sut = new DbLoadRandomTestimonials({
		loadRandomTestimonialsRepository: loadRandomTestimonialsRepositoryStub
	});
	return {
		sut,
		loadRandomTestimonialsRepositoryStub
	};
};

describe("DbLoadRandomTestimonials", () => {
	it("Should call LoadRandomTestimonialsRepository", async () => {
		const { sut, loadRandomTestimonialsRepositoryStub } = makeSut();
		const loadSpy = jest.spyOn(loadRandomTestimonialsRepositoryStub, "load");
		await sut.load();
		expect(loadSpy).toBeCalledTimes(1);
	});
});
