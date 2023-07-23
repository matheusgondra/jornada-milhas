import { AddTestimonialModel, TestimonialModel } from "../../domain";

export interface AddTestimonialRepository {
	add(
		data: AddTestimonialRepository.Params
	): Promise<AddTestimonialRepository.Result>;
}

export namespace AddTestimonialRepository {
	export type Params = AddTestimonialModel;
	export type Result = TestimonialModel;
}
