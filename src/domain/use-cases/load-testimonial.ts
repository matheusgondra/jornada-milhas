import { TestimonialModel } from "../model";

export interface LoadTestimonial {
	load(): Promise<LoadTestimonial.Result>;
}

export namespace LoadTestimonial {
	export type Result = TestimonialModel;
}
