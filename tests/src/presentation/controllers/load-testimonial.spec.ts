import { LoadTestimonialController } from "../../../../src/presentation/controllers/load-testimonial";
import { Validation } from "../../../../src/presentation/helpers/validators/validation";

describe("LoadTestimonial Controller", () => {
	it("Should call Validation with correct values", async () => {
		class ValidationStub implements Validation {
			validate(input: any): Error | null {
				return null;
			}
		}
		const validationStub = new ValidationStub();
		const sut = new LoadTestimonialController({
			validation: validationStub
		});
		const validateSpy = jest.spyOn(validationStub, "validate");
		const httpRequest = {
			body: {},
			params: {
				testimonialId: 1
			}
		};
		await sut.handle(httpRequest);
		expect(validateSpy).toBeCalledWith(httpRequest.params);
	});
});
