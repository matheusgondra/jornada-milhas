import { DbLoadTestimonial } from "../../../../src/data/use-cases";
import { LoadTestimonial } from "../../../../src/domain";

describe("DbLoadTestimonial", () => {
	it("Should call LoadTestimonialRepository", async () => {
		class LoadTestimonialRepositoryStub implements LoadTestimonial {
			async load(
				testimonialId: LoadTestimonial.Params
			): Promise<LoadTestimonial.Result> {
				return {
					id: 1,
					name: "any_name",
					photo: "any_photo",
					testimonial: "any_testimonial"
				};
			}
		}
		const loadTestimonialRepositoryStub = new LoadTestimonialRepositoryStub();
		const sut = new DbLoadTestimonial({
			loadTestimonialRepository: loadTestimonialRepositoryStub
		});
		const loadSpy = jest.spyOn(loadTestimonialRepositoryStub, "load");
		await sut.load(1);
		expect(loadSpy).toBeCalledWith(1);
	});
});
