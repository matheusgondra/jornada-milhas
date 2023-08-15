import { DbLoadTestimonial } from "../../data/use-cases";
import { TestimonialRepository } from "../../infra/db/postgresql/testimonial-repository";
import { LoadTestimonialController } from "../../presentation/controllers";
import { ValidationComposite } from "../../presentation/helpers";
import { IdValidation } from "../../presentation/helpers/validators/id-validation";

export const makeLoadTestimonial = (): LoadTestimonialController => {
	const loadTestimonialRepository = new TestimonialRepository();
	const loadTestimonial = new DbLoadTestimonial({ loadTestimonialRepository });
	const validations = [new IdValidation()];
	const validation = new ValidationComposite(validations);
	return new LoadTestimonialController({ validation, loadTestimonial });
};
