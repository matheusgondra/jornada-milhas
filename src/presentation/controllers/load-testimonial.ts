import { LoadTestimonial } from "../../domain";
import { NotFoundError } from "../errors";
import { badRequest, serverError, success, Validation } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class LoadTestimonialController implements Controller {
	private readonly validation: Validation;
	private readonly loadTestimonial: LoadTestimonial;

	constructor({
		validation,
		loadTestimonial
	}: LoadTestimonialController.Dependencies) {
		this.validation = validation;
		this.loadTestimonial = loadTestimonial;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest);
			if (error) {
				return badRequest(error);
			}

			const testimonialId = Number(httpRequest.params.testimonialId);
			const testimonial = await this.loadTestimonial.load(testimonialId);
			if (!testimonial) {
				return badRequest(new NotFoundError("testimonial"));
			}

			return success(testimonial);
		} catch (error) {
			console.error(error);
			return serverError(error as Error);
		}
	}
}

export namespace LoadTestimonialController {
	export interface Dependencies {
		validation: Validation;
		loadTestimonial: LoadTestimonial;
	}
}
