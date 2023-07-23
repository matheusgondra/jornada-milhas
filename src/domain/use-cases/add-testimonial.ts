import { TestimonialModel } from "../model";

export interface AddTestimonialModel {
	name: string;
	photo: string;
	testimonial: string;
}

export interface AddTestimonial {
	add(testimonial: AddTestimonialModel): Promise<TestimonialModel>;
}
