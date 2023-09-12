import { DeleteTestimonial } from "../../domain";
import { DeleteTestimonialRepository } from "../protocols";

export class DbDeleteTestimonial implements DeleteTestimonial {
	private readonly deleteTestimonialRepository: DeleteTestimonialRepository;

	constructor({
		deleteTestimonialRepository
	}: DbDeleteTestimonial.Dependencies) {
		this.deleteTestimonialRepository = deleteTestimonialRepository;
	}

	async delete(
		testimonialId: DeleteTestimonial.Params
	): Promise<DeleteTestimonial.Result> {
		return await this.deleteTestimonialRepository.delete(testimonialId);
	}
}

export namespace DbDeleteTestimonial {
	export interface Dependencies {
		deleteTestimonialRepository: DeleteTestimonialRepository;
	}
}
