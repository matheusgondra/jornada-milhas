import { LoadTestimonials } from "../../domain";
import { badRequest, success } from "../helpers/http-helpers";
import { Validation } from "../helpers/validators/validation";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class LoadTestimonialsController implements Controller {
	private readonly validation: Validation;
	private readonly loadTestimonials: LoadTestimonials;

	constructor({
		validation,
		loadTestimonials
	}: LoadTestimonialsController.Dependencies) {
		this.validation = validation;
		this.loadTestimonials = loadTestimonials;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest);
		if (error) {
			return badRequest(error);
		}

		const testimonials = await this.loadTestimonials.load();

		return success(testimonials);
	}
}

export namespace LoadTestimonialsController {
	export interface Dependencies {
		validation: Validation;
		loadTestimonials: LoadTestimonials;
	}
}
