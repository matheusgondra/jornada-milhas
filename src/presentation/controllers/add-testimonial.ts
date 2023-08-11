import { AddTestimonial } from "../../domain";
import { badRequest, created, serverError, Validation } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class AddTestimonialController implements Controller {
	private readonly validation: Validation;
	private readonly addTestimonial: AddTestimonial;

	constructor({
		validation,
		addTestimonial
	}: AddTestimonialController.Dependencies) {
		this.validation = validation;
		this.addTestimonial = addTestimonial;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest.body);
			if (error) {
				return badRequest(error);
			}

			const testimonial = await this.addTestimonial.add(httpRequest.body);

			return created(testimonial);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}

export namespace AddTestimonialController {
	export interface Dependencies {
		validation: Validation;
		addTestimonial: AddTestimonial;
	}
}
