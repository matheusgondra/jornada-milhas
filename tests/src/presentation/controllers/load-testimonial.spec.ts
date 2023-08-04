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

interface SutTypes {
	sut: LoadTestimonialController;
	validationStub: Validation;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const sut = new LoadTestimonialController({ validation: validationStub });
	return {
		sut,
		validationStub
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
});
