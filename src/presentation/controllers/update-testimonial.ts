import { Validation, success } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class UpdateTestimonialController implements Controller {
	private readonly validation: Validation;

	constructor({ validation }: UpdateTestimonialController.Dependencies) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		this.validation.validate(httpRequest);

		return success("");
	}
}

export namespace UpdateTestimonialController {
	export interface Dependencies {
		validation: Validation;
	}
}
