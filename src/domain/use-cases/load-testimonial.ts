import { TestimonialModel } from "../model";

export interface LoadTestimonial {
	load(testimonialId: LoadTestimonial.Params): Promise<LoadTestimonial.Result>;
}

export namespace LoadTestimonial {
	export type Params = number;
	export type Result = TestimonialModel | null;
}
