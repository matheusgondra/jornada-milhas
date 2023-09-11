import { DeleteTestimonialController } from "../../../../src/presentation/controllers";
import { Validation } from "../../../../src/presentation/helpers";

describe("DeleteTestimonialController", () => {
	it("Should call Validation with correct values", async () => {
		class ValidationStub implements Validation {
			validate(input: any): Error | null {
				return null;
			}
		}
		const validationStub = new ValidationStub();
		const sut = new DeleteTestimonialController({
			validation: validationStub
		});
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
});
