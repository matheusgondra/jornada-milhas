import { DeleteTestimonial } from "../../../../src/domain";
import { DeleteTestimonialController } from "../../../../src/presentation/controllers";
import { NotFoundError } from "../../../../src/presentation/errors";
import {
	Validation,
	badRequest,
	noContent,
	notFound,
	serverError
} from "../../../../src/presentation/helpers";
import { HttpRequest } from "../../../../src/presentation/protocols";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

const makeDeleteTestimonialStub = (): DeleteTestimonial => {
	class DeleteTestimonialStub implements DeleteTestimonial {
		async delete(
			id: DeleteTestimonial.Params
		): Promise<DeleteTestimonial.Result> {
			return true;
		}
	}
	return new DeleteTestimonialStub();
};

interface SutTypes {
	sut: DeleteTestimonialController;
	validationStub: Validation;
	deleteTestimonialStub: DeleteTestimonial;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const deleteTestimonialStub = makeDeleteTestimonialStub();
	const sut = new DeleteTestimonialController({
		validation: validationStub,
		deleteTestimonial: deleteTestimonialStub
	});
	return {
		sut,
		validationStub,
		deleteTestimonialStub
	};
};

const makeFakeRequest = (): HttpRequest => ({
	params: {
		testimonialId: 1
	}
});

describe("DeleteTestimonialController", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest());
	});

	it("Should return 400 if Validation return error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});

	it("Should call DeleteTestimonial with correct values", async () => {
		const { sut, deleteTestimonialStub } = makeSut();
		const deleteSpy = jest.spyOn(deleteTestimonialStub, "delete");
		await sut.handle(makeFakeRequest());
		expect(deleteSpy).toHaveBeenCalledWith(1);
	});

	it("Should return 500 if DeleteTestimonial throws", async () => {
		const { sut, deleteTestimonialStub } = makeSut();
		jest
			.spyOn(deleteTestimonialStub, "delete")
			.mockRejectedValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(serverError(new Error()));
	});

	it("Should return 404 if DeleteTestimonial return false", async () => {
		const { sut, deleteTestimonialStub } = makeSut();
		jest.spyOn(deleteTestimonialStub, "delete").mockResolvedValueOnce(false);
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(notFound(new NotFoundError("Testimonial")));
	});

	it("Should return 204 on success", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(noContent());
	});
});
