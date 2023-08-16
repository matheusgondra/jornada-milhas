import { UpdateTestimonialController } from "../../../../src/presentation/controllers";
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

	it("Should return 400 if Validation returns an error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpRequest = {
			body: {
				testimonial: "any_testimonial",
				photo: "any_photo"
			},
			params: {
				testimonialId: 1
			}
		};
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse).toEqual(badRequest(new Error()));
	});
});
