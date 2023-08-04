import { badRequest } from "../helpers/http-helpers";
import { Validation } from "../helpers/validators/validation";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class LoadTestimonialController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: LoadTestimonialController.Dependencies) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest);
		if (error) {
			return badRequest(error);
		}

		return {
			statusCode: 200,
			body: ""
		};
	}
}

export namespace LoadTestimonialController {
	export interface Dependencies {
		validation: Validation;
	}
}
