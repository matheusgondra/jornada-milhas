import { TestimonialModel } from "../model";

export interface LoadRandomTestimonials {
	load(): Promise<LoadRandomTestimonials.Result>;
}

export namespace LoadRandomTestimonials {
	export type Result = TestimonialModel[];
}
