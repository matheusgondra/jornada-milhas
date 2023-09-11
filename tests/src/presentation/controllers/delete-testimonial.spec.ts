import { DeleteTestimonialController } from "../../../../src/presentation/controllers";
import { Validation, badRequest } from "../../../../src/presentation/helpers";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

interface SutTypes {
	sut: DeleteTestimonialController;
	validationStub: Validation;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const sut = new DeleteTestimonialController({
		validation: validationStub
	});
	return {
		sut,
		validationStub
	};
};

describe("DeleteTestimonialController", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		const httpRequest = {
			params: {
				testimonialId: 1
			},
			body: {}
		};
		await sut.handle(httpRequest);
		expect(validateSpy).toHaveBeenCalledWith(httpRequest);
	});

	it("Should return 400 if Validation return error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpRequest = {
			params: {
				testimonialId: 1
			},
			body: {}
		};
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse).toEqual(badRequest(new Error()));
	});
});
