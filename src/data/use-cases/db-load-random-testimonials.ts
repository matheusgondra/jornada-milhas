import { LoadRandomTestimonials } from "../../domain";
import { LoadRandomTestimonialsRepository } from "../protocols";

export class DbLoadRandomTestimonials implements LoadRandomTestimonials {
	private readonly loadRandomTestimonialsRepository: LoadRandomTestimonialsRepository;

	constructor({
		loadRandomTestimonialsRepository
	}: DbLoadRandomTestimonials.Dependencies) {
		this.loadRandomTestimonialsRepository = loadRandomTestimonialsRepository;
	}

	async load(): Promise<LoadRandomTestimonials.Result> {
		return await this.loadRandomTestimonialsRepository.load();
	}
}

export namespace DbLoadRandomTestimonials {
	export interface Dependencies {
		loadRandomTestimonialsRepository: LoadRandomTestimonialsRepository;
	}
}
