import { DbLoadTestimonials } from "../../data/use-cases";
import { TestimonialRepository } from "../../infra/db";
import { LoadTestimonialsController } from "../../presentation/controllers";

export const makeLoadTestimonials = (): LoadTestimonialsController => {
	const loadTestimonialsRepository = new TestimonialRepository();
	const loadTestimonials = new DbLoadTestimonials({
		loadTestimonialsRepository
	});
	return new LoadTestimonialsController({ loadTestimonials });
};
