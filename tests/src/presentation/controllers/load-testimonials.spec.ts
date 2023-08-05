import { LoadTestimonials, TestimonialModel } from "../../../../src/domain";
import { LoadTestimonialsController } from "../../../../src/presentation/controllers/load-testimonials";
import {
	badRequest,
	success
} from "../../../../src/presentation/helpers/http-helpers";
import { Validation } from "../../../../src/presentation/helpers/validators/validation";
import { HttpRequest } from "../../../../src/presentation/protocols/http";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

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
	validationStub: Validation;
	loadTestimonialsStub: LoadTestimonials;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const loadTestimonialsStub = makeLoadTestimonialsStub();
	const sut = new LoadTestimonialsController({
		validation: validationStub,
		loadTestimonials: loadTestimonialsStub
	});
	return {
		sut,
		validationStub,
		loadTestimonialsStub
	};
};

const makeFakeRequest = (): HttpRequest => ({
	body: ""
});

describe("LoadTestimonialController", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validateSpy).toBeCalledWith(makeFakeRequest());
	});

	it("Should return 400 if Validation return error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});

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
