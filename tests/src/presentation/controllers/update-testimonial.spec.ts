import { UpdateTestimonialController } from "../../../../src/presentation/controllers";
import { Validation } from "../../../../src/presentation/helpers";

describe("UpdateTestimonial", () => {
	it("Should call Validation with correct values", async () => {
		class ValidationStub implements Validation {
			validate(input: any): Error | null {
				return null;
			}
		}
		const validationStub = new ValidationStub();
		const sut = new UpdateTestimonialController({
			validation: validationStub
		});
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
