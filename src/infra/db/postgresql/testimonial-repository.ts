import { AddTestimonialRepository } from "../../../data/protocols";
import { LoadTestimonials } from "../../../domain";
import { db } from "./prisma";

export class TestimonialRepository
	implements AddTestimonialRepository, LoadTestimonials
{
	async add(
		data: AddTestimonialRepository.Params
	): Promise<AddTestimonialRepository.Result> {
		const testimonial = await db.testimonial.create({
			data
		});

		return testimonial;
	}

	async load(): Promise<LoadTestimonials.Result> {
		const testimonials = await db.testimonial.findMany();
		return testimonials;
	}
}
