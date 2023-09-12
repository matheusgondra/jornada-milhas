import { DbDeleteTestimonial } from "../../data/use-cases";
import { TestimonialRepository } from "../../infra/db";
import { DeleteTestimonialController } from "../../presentation/controllers";
import { IdValidation, ValidationComposite } from "../../presentation/helpers";

export const makeDeleteTestimonial = (): DeleteTestimonialController => {
	const deleteTestimonialRepository = new TestimonialRepository();
	const deleteTestimonial = new DbDeleteTestimonial({
		deleteTestimonialRepository
	});
	const validations = [new IdValidation()];
	const validation = new ValidationComposite(validations);
	return new DeleteTestimonialController({ deleteTestimonial, validation });
};
