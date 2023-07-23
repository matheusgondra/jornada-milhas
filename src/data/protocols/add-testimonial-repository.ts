import { AddTestimonialModel, TestimonialModel } from "../../domain";

export interface AddTestimonialRepository {
	add(data: AddTestimonialModel): Promise<TestimonialModel>;
}
