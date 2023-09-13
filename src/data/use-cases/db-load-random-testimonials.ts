import { LoadRandomTestimonials } from "../../domain";
import { LoadTestimonialsRepository } from "../protocols";

export class DbLoadRandomTestimonials implements LoadRandomTestimonials {
	private readonly loadTestimonialsRepository: LoadTestimonialsRepository;

	constructor({
		loadTestimonialsRepository
	}: DbLoadRandomTestimonials.Dependencies) {
		this.loadTestimonialsRepository = loadTestimonialsRepository;
	}

	async load(): Promise<LoadRandomTestimonials.Result> {
		return await this.loadTestimonialsRepository.load();
	}
}

export namespace DbLoadRandomTestimonials {
	export interface Dependencies {
		loadTestimonialsRepository: LoadTestimonialsRepository;
	}
}
