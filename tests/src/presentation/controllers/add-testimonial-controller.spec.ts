import { AddTestimonialController } from "../../../../src/presentation/controllers/add-testimonial";
import { MissingParamError } from "../../../../src/presentation/errors";
import { badRequest } from "../../../../src/presentation/helpers/http-helpers";
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
	sut: AddTestimonialController;
	validationStub: Validation;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const sut = new AddTestimonialController(validationStub);
	return {
		sut,
		validationStub
	};
};

describe("AddTestimonial Controller", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		const httpRequest = {
			body: {
				name: "any_name",
				photo: "any_photo",
				testimonial: "any_testimonial"
			}
		};
		await sut.handle(httpRequest);
		expect(validateSpy).toBeCalledWith(httpRequest.body);
	});

	it("Should return 400 if validation return error", async () => {
		const { sut, validationStub } = makeSut();
		jest
			.spyOn(validationStub, "validate")
			.mockReturnValueOnce(new MissingParamError("any_field"));
		const httpResquest = {
			body: {
				name: "any_name",
				photo: "any_photo",
				testimonial: "any_testimonial"
			}
		};
		const httpResponse = await sut.handle(httpResquest);
		expect(httpResponse).toEqual(
			badRequest(new MissingParamError("any_field"))
		);
	});
});
