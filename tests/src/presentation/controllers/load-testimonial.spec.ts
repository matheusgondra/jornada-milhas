import { LoadTestimonial } from "../../../../src/domain";
import { LoadTestimonialController } from "../../../../src/presentation/controllers";
import { NotFoundError } from "../../../../src/presentation/errors";
import {
	badRequest,
	notFound,
	serverError,
	success,
	Validation
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

const makeLoadTestimonialStub = (): LoadTestimonial => {
	class LoadTestimonialStub implements LoadTestimonial {
		async load(
			testimonialId: LoadTestimonial.Params
		): Promise<LoadTestimonial.Result> {
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
	params: {
		testimonialId: 1
	}
});

describe("LoadTestimonial Controller", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validateSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validateSpy).toBeCalledWith(makeFakeRequest());
	});

	it("Should 400 if Validation returns an error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});

	it("Should call LoadTestimonial with correct values", async () => {
		const { sut, loadTestimonialStub } = makeSut();
		const loadSpy = jest.spyOn(loadTestimonialStub, "load");
		await sut.handle(makeFakeRequest());
		expect(loadSpy).toBeCalledWith(1);
	});

	it("Should returns 500 if LoadTestimonial throws", async () => {
		const { sut, loadTestimonialStub } = makeSut();
		jest
			.spyOn(loadTestimonialStub, "load")
			.mockRejectedValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(serverError(new Error()));
	});

	it("Should return 404 if LoadTestimonial returns null", async () => {
		const { sut, loadTestimonialStub } = makeSut();
		jest.spyOn(loadTestimonialStub, "load").mockResolvedValueOnce(null);
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(notFound(new NotFoundError("testimonial")));
	});

	it("Should return a testimonial on success", async () => {
		const { sut } = makeSut();
		const testimonial = await sut.handle(makeFakeRequest());
		expect(testimonial).toEqual(
			success({
				id: 1,
				name: "any_name",
				photo: "any_photo",
				testimonial: "any_testimonial"
			})
		);
	});
});
