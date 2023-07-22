import { Validation } from "../helpers/validators/validation";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class AddTestimonialController implements Controller {
	private readonly validation: Validation;

	constructor(validation: Validation) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		this.validation.validate(httpRequest.body);

		return {
			statusCode: 201,
			body: ""
		};
	}
}
