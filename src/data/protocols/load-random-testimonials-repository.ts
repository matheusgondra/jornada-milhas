import { TestimonialModel } from "../../domain";

export interface LoadRandomTestimonialsRepository {
	load(): Promise<LoadRandomTestimonialsRepository.Result>;
}

export namespace LoadRandomTestimonialsRepository {
	export type Result = TestimonialModel[];
}
