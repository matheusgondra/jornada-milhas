import { LoadTestimonials } from "../../../../src/domain";
import { LoadTestimonialsController } from "../../../../src/presentation/controllers/load-testimonials";
import { success } from "../../../../src/presentation/helpers/http-helpers";
import { HttpRequest } from "../../../../src/presentation/protocols/http";

const makeLoadTestimonialsStub = (): LoadTestimonials => {
	class LoadTestimonialsStub implements LoadTestimonials {
		async load(): Promise<LoadTestimonials.Result> {
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
	return new LoadTestimonialsStub();
};

interface SutTypes {
	sut: LoadTestimonialsController;
	loadTestimonialsStub: LoadTestimonials;
}

const makeSut = (): SutTypes => {
	const loadTestimonialsStub = makeLoadTestimonialsStub();
	const sut = new LoadTestimonialsController({
		loadTestimonials: loadTestimonialsStub
	});
	return {
		sut,

		loadTestimonialsStub
	};
};

const makeFakeRequest = (): HttpRequest => ({
	body: ""
});

describe("LoadTestimonialsController", () => {
	it("Should call LoadTestimonials", async () => {
		const { sut, loadTestimonialsStub } = makeSut();
		const loadSpy = jest.spyOn(loadTestimonialsStub, "load");
		await sut.handle(makeFakeRequest());
		expect(loadSpy).toBeCalledTimes(1);
	});

	it("Should return the testimonials on success", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(
			success([
				{
					id: 1,
					name: "any_name",
					photo: "any_photo",
					testimonial: "any_testimonial"
				}
			])
		);
	});
});
