import { TestimonialModel } from "../model";

export interface UpdateTestimonial {
	update(data: UpdateTestimonial.Params): Promise<UpdateTestimonial.Result>;
}

export namespace UpdateTestimonial {
	export type Params = {
		testimonialId: number;
		data: {
			photo: string;
			testimonial: string;
		};
	};
	export type Result = TestimonialModel;
}
