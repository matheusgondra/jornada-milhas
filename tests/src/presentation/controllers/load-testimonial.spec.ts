import { LoadTestimonialController } from "../../../../src/presentation/controllers/load-testimonial";
import { Validation } from "../../../../src/presentation/helpers/validators/validation";

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
	const sut = new LoadTestimonialController({
		validation: validationStub
	});
	return {
		sut,
		validationStub
	};
};

describe("LoadTestimonial Controller", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		const httpRequest = {
			params: {
				testimonialId: 1
			}
		};
		await sut.handle(httpRequest);
		expect(validateSpy).toBeCalledWith(httpRequest.params);
	});
});
