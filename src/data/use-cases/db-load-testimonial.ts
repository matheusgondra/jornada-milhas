import { LoadTestimonial } from "../../domain";
import { LoadTestimonialRepository } from "../protocols";

export class DbLoadTestimonial implements LoadTestimonial {
	private readonly loadTestimonialRepository: LoadTestimonialRepository;

	constructor({ loadTestimonialRepository }: DbLoadTestimonial.Dependencies) {
		this.loadTestimonialRepository = loadTestimonialRepository;
	}

	async load(
		testimonialId: LoadTestimonial.Params
	): Promise<LoadTestimonial.Result> {
		const testimonial = await this.loadTestimonialRepository.load(
			testimonialId
		);
		return testimonial;
	}
}

export namespace DbLoadTestimonial {
	export interface Dependencies {
		loadTestimonialRepository: LoadTestimonialRepository;
	}
}
