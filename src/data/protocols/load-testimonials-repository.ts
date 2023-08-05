import { TestimonialModel } from "../../domain";

export interface LoadTestimonialsRepository {
	load(): Promise<LoadTestimonialsRepository.Result>;
}

export namespace LoadTestimonialsRepository {
	export type Result = TestimonialModel[];
}
