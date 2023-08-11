import { LoadTestimonials } from "../../domain";
import { serverError, success } from "../helpers";
import { HttpRequest, HttpResponse, Controller } from "../protocols";

export class LoadTestimonialsController implements Controller {
	private readonly loadTestimonials: LoadTestimonials;

	constructor({ loadTestimonials }: LoadTestimonialsController.Dependencies) {
		this.loadTestimonials = loadTestimonials;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const testimonials = await this.loadTestimonials.load();
			return success(testimonials);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}

export namespace LoadTestimonialsController {
	export interface Dependencies {
		loadTestimonials: LoadTestimonials;
	}
}
