import { AddTestimonial } from "../../domain";
import { AddTestimonialRepository } from "../protocols";

export class DbAddTestimonial implements AddTestimonial {
	private readonly addTestimonialRepository: AddTestimonialRepository;

	constructor({ addTestimonialRepository }: DbAddTestimonial.Dependencies) {
		this.addTestimonialRepository = addTestimonialRepository;
	}

	async add(data: AddTestimonial.Params): Promise<AddTestimonial.Result> {
		const testimonial = await this.addTestimonialRepository.add(data);
		return testimonial;
	}
}

export namespace DbAddTestimonial {
	export interface Dependencies {
		addTestimonialRepository: AddTestimonialRepository;
	}
}
