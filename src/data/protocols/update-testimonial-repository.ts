import { TestimonialModel } from "../../domain";

export interface UpdateTestimonialRepository {
	update: (
		data: UpdateTestimonialRepository.Params
	) => Promise<UpdateTestimonialRepository.Result>;
}

export namespace UpdateTestimonialRepository {
	export type Params = {
		testimonialId: number;
		data: {
			testimonial: string;
			photo: string;
		};
	};
	export type Result = TestimonialModel;
}
