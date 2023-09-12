import { LoadRandomTestimonials } from "../../../../src/domain";
import { LoadRandomTestimonialsController } from "../../../../src/presentation/controllers";

const makeLoadRandomTestimonials = (): LoadRandomTestimonials => {
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
	return new LoadRandomTestimonialsStub();
};

interface SutTypes {
	sut: LoadRandomTestimonialsController;
	loadRandomTestimonialsStub: LoadRandomTestimonials;
}

const makeSut = (): SutTypes => {
	const loadRandomTestimonialsStub = makeLoadRandomTestimonials();
	const sut = new LoadRandomTestimonialsController({
		loadRandomTestimonials: loadRandomTestimonialsStub
	});
	return {
		sut,
		loadRandomTestimonialsStub
	};
};

describe("LoadRandomTestimonialsController", () => {
	it("Should call LoadRandomTestimonials", async () => {
		const { sut, loadRandomTestimonialsStub } = makeSut();
		const loadSpy = jest.spyOn(loadRandomTestimonialsStub, "load");
		await sut.handle({});
		expect(loadSpy).toBeCalledTimes(1);
	});
});
