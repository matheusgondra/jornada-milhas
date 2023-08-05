import { LoadTestimonialsRepository } from "../../../../src/data/protocols/load-testimonials-repository";
import { DbLoadTestimonials } from "../../../../src/data/use-cases/db-load-testimonials";

describe("DbLoadTestimonials", () => {
	it("Should call LoadTestimonialsRepository", async () => {
		class LoadTestimonialsRepositoryStub
			implements LoadTestimonialsRepository
		{
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
		const loadTestimonialsRepositoryStub =
			new LoadTestimonialsRepositoryStub();
		new LoadTestimonialsRepositoryStub();
		const sut = new DbLoadTestimonials({
			loadTestimonialsRepository: loadTestimonialsRepositoryStub
		});
		const loadSpy = jest.spyOn(loadTestimonialsRepositoryStub, "load");
		await sut.load();
		expect(loadSpy).toBeCalledTimes(1);
	});
});
