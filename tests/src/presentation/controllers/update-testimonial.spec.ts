import { UpdateTestimonialController } from "../../../../src/presentation/controllers";
import { Validation } from "../../../../src/presentation/helpers";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

interface SutTypes {
	sut: UpdateTestimonialController;
	validationStub: Validation;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const sut = new UpdateTestimonialController({
		validation: validationStub
	});
	return {
		sut,
		validationStub
	};
};

describe("UpdateTestimonial", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		const httpRequest = {
			body: {
				testimonial: "any_testimonial",
				photo: "any_photo"
			},
			params: {
				testimonialId: 1
			}
		};
		await sut.handle(httpRequest);
		expect(validateSpy).toBeCalledWith(httpRequest);
	});
});
