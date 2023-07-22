import { AddTestimonialController } from "../../../../src/presentation/controllers/add-testimonial";
import { Validation } from "../../../../src/presentation/helpers/validators/validation";

describe("AddTestimonial Controller", () => {
	it("Should call Validation with correct values", async () => {
		class ValidationStub implements Validation {
			validate(input: any): Error | null {
				return null;
			}
		}
		const validationStub = new ValidationStub();
		const sut = new AddTestimonialController(validationStub);
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
});
