import { Validation } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class DeleteTestimonialController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: DeleteTestimonialController.Dependencies) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		this.validation.validate(httpRequest);
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
