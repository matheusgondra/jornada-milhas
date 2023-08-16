import { Validation, badRequest, success } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class UpdateTestimonialController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: UpdateTestimonialController.Dependencies) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest);
		if (error) {
			return badRequest(error);
		}

		return success("");
	}
}

export namespace UpdateTestimonialController {
	export interface Dependencies {
		validation: Validation;
	}
}
