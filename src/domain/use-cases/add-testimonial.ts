import { TestimonialModel } from "../model";

export interface AddTestimonialModel {
	name: string;
	photo: string;
	testimonial: string;
}

export interface AddTestimonial {
	add(testimonial: AddTestimonial.Params): Promise<AddTestimonial.Result>;
}

export namespace AddTestimonial {
	export type Params = AddTestimonialModel;
	export type Result = TestimonialModel;
}
