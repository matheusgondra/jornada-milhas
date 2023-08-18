import {
	AddTestimonialRepository,
	LoadTestimonialRepository,
	LoadTestimonialsRepository,
	UpdateTestimonialRepository
} from "../../../data/protocols";
import { db } from "./prisma";

export class TestimonialRepository
	implements
		AddTestimonialRepository,
		LoadTestimonialsRepository,
		LoadTestimonialRepository,
		UpdateTestimonialRepository
{
	async add(
		data: AddTestimonialRepository.Params
	): Promise<AddTestimonialRepository.Result> {
		const testimonial = await db.testimonial.create({
			data
		});

		return testimonial;
	}

	async load(): Promise<LoadTestimonialsRepository.Result> {
		const testimonials = await db.testimonial.findMany();
		return testimonials;
	}

	async loadById(
		testimonialId: LoadTestimonialRepository.Params
	): Promise<LoadTestimonialRepository.Result> {
		const testimonial = await db.testimonial.findUnique({
			where: {
				id: testimonialId
			}
		});

		if (testimonial) {
			return testimonial;
		}
		return null;
	}

	async update(
		data: UpdateTestimonialRepository.Params
	): Promise<UpdateTestimonialRepository.Result> {
		const testimonial = await db.testimonial.update({
			where: {
				id: data.testimonialId
			},
			data: data.data
		});

		return testimonial;
	}
}
