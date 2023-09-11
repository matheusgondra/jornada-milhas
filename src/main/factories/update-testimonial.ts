import { DbUpdateTestimonial } from "../../data/use-cases";
import { TestimonialRepository } from "../../infra/db";
import { UpdateTestimonialController } from "../../presentation/controllers";
import { IdValidation, ValidationComposite } from "../../presentation/helpers";

export const makeUpdateTestimonial = (): UpdateTestimonialController => {
	const updateTestimonialRepository = new TestimonialRepository();
	const updateTestimonial = new DbUpdateTestimonial({
		updateTestimonialRepository
	});
	const validations = [new IdValidation()];
	const validation = new ValidationComposite(validations);
	return new UpdateTestimonialController({ updateTestimonial, validation });
};
