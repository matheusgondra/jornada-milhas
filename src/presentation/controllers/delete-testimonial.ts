import { Validation, badRequest } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class DeleteTestimonialController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: DeleteTestimonialController.Dependencies) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest);
		if (error) {
			return badRequest(error);
		}
		return {
			statusCode: 200,
			body: {}
		};
	}
}

export namespace DeleteTestimonialController {
	export interface Dependencies {
		validation: Validation;
	}
}
