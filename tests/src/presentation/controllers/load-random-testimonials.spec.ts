import { LoadRandomTestimonials } from "../../../../src/domain";
import { LoadRandomTestimonialsController } from "../../../../src/presentation/controllers";

describe("LoadRandomTestimonialsController", () => {
	it("Should call LoadRandomTestimonials", async () => {
		class LoadRandomTestimonialsStub implements LoadRandomTestimonials {
			async load(): Promise<LoadRandomTestimonials.Result> {
				return [
					{
						id: 1,
						name: "any_name",
						photo: "any_photo",
						testimonial: "any_testimonial"
					},
					{
						id: 1,
						name: "any_name",
						photo: "any_photo",
						testimonial: "any_testimonial"
					},
					{
						id: 1,
						name: "any_name",
						photo: "any_photo",
						testimonial: "any_testimonial"
					}
				];
			}
		}
		const loadRandomTestimonialsStub = new LoadRandomTestimonialsStub();
		const sut = new LoadRandomTestimonialsController({
			loadRandomTestimonials: loadRandomTestimonialsStub
		});
		const loadSpy = jest.spyOn(loadRandomTestimonialsStub, "load");
		await sut.handle({});
		expect(loadSpy).toBeCalledTimes(1);
	});
});
