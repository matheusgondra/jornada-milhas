import { LoadRandomTestimonials, TestimonialModel } from "../../domain";
import { LoadTestimonialsRepository } from "../protocols";

export class DbLoadRandomTestimonials implements LoadRandomTestimonials {
	private readonly loadTestimonialsRepository: LoadTestimonialsRepository;

	constructor({
		loadTestimonialsRepository
	}: DbLoadRandomTestimonials.Dependencies) {
		this.loadTestimonialsRepository = loadTestimonialsRepository;
	}

	async load(): Promise<LoadRandomTestimonials.Result> {
		const testimonials = await this.loadTestimonialsRepository.load();

		if (testimonials.length <= 3) {
			return testimonials;
		}

		const randomTestimonials: TestimonialModel[] = [];
		while (randomTestimonials.length < 3) {
			const randomId = Math.floor(Math.random() * testimonials.length);
			const randomTestimonial = testimonials[randomId];

			if (!randomTestimonials.includes(randomTestimonial)) {
				randomTestimonials.push(randomTestimonial);
			}
		}
		return randomTestimonials;
	}
}

export namespace DbLoadRandomTestimonials {
	export interface Dependencies {
		loadTestimonialsRepository: LoadTestimonialsRepository;
	}
}
