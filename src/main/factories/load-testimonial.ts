import { DbLoadTestimonial } from "../../data/use-cases";
import { TestimonialRepository } from "../../infra/db";
import { LoadTestimonialController } from "../../presentation/controllers";
import { ValidationComposite, IdValidation } from "../../presentation/helpers";

export const makeLoadTestimonial = (): LoadTestimonialController => {
	const loadTestimonialRepository = new TestimonialRepository();
	const loadTestimonial = new DbLoadTestimonial({ loadTestimonialRepository });
	const validations = [new IdValidation()];
	const validation = new ValidationComposite(validations);
	return new LoadTestimonialController({ validation, loadTestimonial });
};
