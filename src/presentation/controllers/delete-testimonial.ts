import { DeleteTestimonial } from "../../domain";
import { Validation, badRequest, serverError } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class DeleteTestimonialController implements Controller {
	private readonly validation: Validation;
	private readonly deleteTestimonial: DeleteTestimonial;

	constructor({
		validation,
		deleteTestimonial
	}: DeleteTestimonialController.Dependencies) {
		this.validation = validation;
		this.deleteTestimonial = deleteTestimonial;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest);
			if (error) {
				return badRequest(error);
			}

			const testimonialId = Number(httpRequest.params.testimonialId);
			await this.deleteTestimonial.delete(testimonialId);

			return {
				statusCode: 200,
				body: {}
			};
		} catch (error) {
			return serverError(error as Error);
		}
	}
}

export namespace DeleteTestimonialController {
	export interface Dependencies {
		validation: Validation;
		deleteTestimonial: DeleteTestimonial;
	}
}
