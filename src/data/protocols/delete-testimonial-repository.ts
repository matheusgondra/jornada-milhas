export interface DeleteTestimonialRepository {
	delete(
		testimonialId: DeleteTestimonialRepository.Params
	): Promise<DeleteTestimonialRepository.Result>;
}

export namespace DeleteTestimonialRepository {
	export type Params = number;
	export type Result = boolean;
}
