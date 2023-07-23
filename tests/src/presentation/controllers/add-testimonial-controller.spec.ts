import {
	AddTestimonial,
	AddTestimonialModel,
	TestimonialModel
} from "../../../../src/domain";
import { AddTestimonialController } from "../../../../src/presentation/controllers/add-testimonial";
import { MissingParamError } from "../../../../src/presentation/errors";
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

const makeAddTestimonialStub = (): AddTestimonial => {
	class AddTestimonialStub implements AddTestimonial {
		async add(testimonial: AddTestimonialModel): Promise<TestimonialModel> {
			return {
				id: 1,
				name: "any_name",
				photo: "any_photo",
				testimonial: "any_testimonial"
			};
		}
	}
	return new AddTestimonialStub();
};

const makeFakeRequest = (): HttpRequest => {
	return {
		body: {
			name: "any_name",
			photo: "any_photo",
			testimonial: "any_testimonial"
		}
	};
};

interface SutTypes {
	sut: AddTestimonialController;
	validationStub: Validation;
	addTestimonialStub: AddTestimonial;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const addTestimonialStub = makeAddTestimonialStub();
	const sut = new AddTestimonialController(validationStub, addTestimonialStub);
	return {
		sut,
		validationStub,
		addTestimonialStub
	};
};

describe("AddTestimonial Controller", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validateSpy).toBeCalledWith(makeFakeRequest().body);
	});

	it("Should return 400 if validation return error", async () => {
		const { sut, validationStub } = makeSut();
		jest
			.spyOn(validationStub, "validate")
			.mockReturnValueOnce(new MissingParamError("any_field"));
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(
			badRequest(new MissingParamError("any_field"))
		);
	});

	it("Should call AddTestimonial with correct values", async () => {
		const { sut, addTestimonialStub } = makeSut();
		const addTestimonialSpy = jest.spyOn(addTestimonialStub, "add");
		await sut.handle(makeFakeRequest());
		expect(addTestimonialSpy).toBeCalledWith(makeFakeRequest().body);
	});
});
