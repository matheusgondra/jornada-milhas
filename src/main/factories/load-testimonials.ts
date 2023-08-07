import { DbLoadTestimonials } from "../../data/use-cases/db-load-testimonials";
import { TestimonialRepository } from "../../infra/db/postgresql/testimonial-repository";
import { LoadTestimonialsController } from "../../presentation/controllers/load-testimonials";

export const makeLoadTestimonials = (): LoadTestimonialsController => {
	const loadTestimonialsRepository = new TestimonialRepository();
	const loadTestimonials = new DbLoadTestimonials({
		loadTestimonialsRepository
	});
	return new LoadTestimonialsController({ loadTestimonials });
};
