import { AddTestimonialRepository } from "../../../data/protocols";
import { db } from "./prisma";

export class TestimonialRepository implements AddTestimonialRepository {
	async add(
		data: AddTestimonialRepository.Params
	): Promise<AddTestimonialRepository.Result> {
		const testimonial = await db.testimonial.create({
			data
		});

		return testimonial;
	}
}
