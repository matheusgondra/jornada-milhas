import { TestimonialModel } from "../../domain";

export interface LoadTestimonialRepository {
	loadById(
		testimonialId: LoadTestimonialRepository.Params
	): Promise<LoadTestimonialRepository.Result>;
}

export namespace LoadTestimonialRepository {
	export type Params = number;
	export type Result = TestimonialModel | null;
}
