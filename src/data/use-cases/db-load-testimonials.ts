import { LoadTestimonials } from "../../domain";
import { LoadTestimonialsRepository } from "../protocols";

export class DbLoadTestimonials implements LoadTestimonials {
	private readonly loadTestimonialsRepository: LoadTestimonialsRepository;

	constructor({ loadTestimonialsRepository }: DbLoadTestimonials.Dependecies) {
		this.loadTestimonialsRepository = loadTestimonialsRepository;
	}

	async load(): Promise<LoadTestimonials.Result> {
		const testimonials = await this.loadTestimonialsRepository.load();
		return testimonials;
	}
}

export namespace DbLoadTestimonials {
	export interface Dependecies {
		loadTestimonialsRepository: LoadTestimonialsRepository;
	}
}
