import { UpdateTestimonial } from "../../../../src/domain";
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

const makeUpdateTestimonialStub = (): UpdateTestimonial => {
	class UpdateTestimonialStub implements UpdateTestimonial {
		async update(
			data: UpdateTestimonial.Params
		): Promise<UpdateTestimonial.Result> {
			return {
				id: 1,
				name: "any_name",
				testimonial: "any_testimonial",
				photo: "any_photo"
			};
		}
	}
	return new UpdateTestimonialStub();
};

interface SutTypes {
	sut: UpdateTestimonialController;
	validationStub: Validation;
	updateTestimonialStub: UpdateTestimonial;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const updateTestimonialStub = makeUpdateTestimonialStub();
	const sut = new UpdateTestimonialController({
		validation: validationStub,
		updateTestimonial: updateTestimonialStub
	});
	return {
		sut,
		validationStub,
		updateTestimonialStub
	};
};

const makeFakeRequest = () => ({
	body: {
		testimonial: "any_testimonial",
		photo: "any_photo"
	},
	params: {
		testimonialId: 1
	}
});

describe("UpdateTestimonial", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validateSpy).toBeCalledWith(makeFakeRequest());
	});

	it("Should return 400 if Validation returns an error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});

	it("Should call UpdateTestimonial with correct values", async () => {
		const { sut, updateTestimonialStub } = makeSut();
		const updateSpy = jest.spyOn(updateTestimonialStub, "update");
		await sut.handle(makeFakeRequest());
		expect(updateSpy).toBeCalledWith({
			testimonialId: 1,
			data: makeFakeRequest().body
		});
	});
});
