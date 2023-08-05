import { LoadTestimonial, TestimonialModel } from "../../../../src/domain";
import { LoadTestimonialController } from "../../../../src/presentation/controllers/load-testimonial";
import { badRequest } from "../../../../src/presentation/helpers/http-helpers";
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

const makeLoadTestimonialStub = (): LoadTestimonial => {
	class LoadTestimonialStub implements LoadTestimonial {
		async load(): Promise<TestimonialModel> {
			return {
				id: 1,
				name: "any_name",
				photo: "any_photo",
				testimonial: "any_testimonial"
			};
		}
	}
	return new LoadTestimonialStub();
};

interface SutTypes {
	sut: LoadTestimonialController;
	validationStub: Validation;
	loadTestimonialStub: LoadTestimonial;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const loadTestimonialStub = makeLoadTestimonialStub();
	const sut = new LoadTestimonialController({
		validation: validationStub,
		loadTestimonial: loadTestimonialStub
	});
	return {
		sut,
		validationStub,
		loadTestimonialStub
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

	it("Should call LoadTestimonial", async () => {
		const { sut, loadTestimonialStub } = makeSut();
		const loadSpy = jest.spyOn(loadTestimonialStub, "load");
		await sut.handle(makeFakeRequest());
		expect(loadSpy).toBeCalledTimes(1);
	});
});
