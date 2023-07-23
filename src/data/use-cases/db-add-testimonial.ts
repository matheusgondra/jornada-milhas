import {
	AddTestimonial,
	AddTestimonialModel,
	TestimonialModel
} from "../../domain";
import { AddTestimonialRepository } from "../protocols";

export class DbAddTestimonial implements AddTestimonial {
	private readonly addTestimonialRepository: AddTestimonialRepository;

	constructor(addTestimonialRepository: AddTestimonialRepository) {
		this.addTestimonialRepository = addTestimonialRepository;
	}

	async add(data: AddTestimonialModel): Promise<TestimonialModel> {
		const testimonial = await this.addTestimonialRepository.add(data);
		return testimonial;
	}
}
