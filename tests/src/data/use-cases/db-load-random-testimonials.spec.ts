import { LoadRandomTestimonialsRepository } from "../../../../src/data/protocols";
import { DbLoadRandomTestimonials } from "../../../../src/data/use-cases";

describe("DbLoadRandomTestimonials", () => {
	it("Should call LoadRandomTestimonialsRepository", async () => {
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
		const loadRandomTestimonialsRepositoryStub =
			new LoadRandomTestimonialsRepositoryStub();
		const sut = new DbLoadRandomTestimonials({
			loadRandomTestimonialsRepository: loadRandomTestimonialsRepositoryStub
		});
		const loadSpy = jest.spyOn(loadRandomTestimonialsRepositoryStub, "load");
		await sut.load();
		expect(loadSpy).toBeCalledTimes(1);
	});
});
