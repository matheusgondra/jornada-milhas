import { LoadTestimonials } from "../../domain";
import { badRequest, success } from "../helpers/http-helpers";
import { Validation } from "../helpers/validators/validation";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class LoadTestimonialsController implements Controller {
	private readonly loadTestimonials: LoadTestimonials;

	constructor({ loadTestimonials }: LoadTestimonialsController.Dependencies) {
		this.loadTestimonials = loadTestimonials;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const testimonials = await this.loadTestimonials.load();

		return success(testimonials);
	}
}

export namespace LoadTestimonialsController {
	export interface Dependencies {
		loadTestimonials: LoadTestimonials;
	}
}
