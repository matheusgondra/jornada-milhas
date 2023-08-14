import { TestimonialModel } from "../model";

export interface LoadTestimonials {
	load(): Promise<LoadTestimonials.Result>;
}

export namespace LoadTestimonials {
	export type Result = TestimonialModel[] | [];
}
