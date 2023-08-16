import { UpdateTestimonial } from "../../domain";
import { UpdateTestimonialRepository } from "../protocols";

export class DbUpdateTestimonial implements UpdateTestimonial {
	private readonly updateTestimonialRepository: UpdateTestimonialRepository;

	constructor({
		updateTestimonialRepository
	}: DbUpdateTestimonial.Dependencies) {
		this.updateTestimonialRepository = updateTestimonialRepository;
	}

	async update(
		data: UpdateTestimonial.Params
	): Promise<UpdateTestimonial.Result> {
		const testimonialUpdated = await this.updateTestimonialRepository.update(
			data
		);
		return testimonialUpdated;
	}
}

export namespace DbUpdateTestimonial {
	export interface Dependencies {
		updateTestimonialRepository: UpdateTestimonialRepository;
	}
}
