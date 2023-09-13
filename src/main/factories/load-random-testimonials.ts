import { DbLoadRandomTestimonials } from "../../data/use-cases";
import { TestimonialRepository } from "../../infra/db";
import { LoadRandomTestimonialsController } from "../../presentation/controllers";

export const makeLoadRandomTestimonials =
	(): LoadRandomTestimonialsController => {
		const loadTestimonialsRepository = new TestimonialRepository();
		const loadRandomTestimonials = new DbLoadRandomTestimonials({
			loadTestimonialsRepository
		});
		return new LoadRandomTestimonialsController({ loadRandomTestimonials });
	};
