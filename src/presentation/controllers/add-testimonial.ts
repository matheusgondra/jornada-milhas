import { badRequest, created } from "../helpers/http-helpers";
import { Validation } from "../helpers/validators/validation";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class AddTestimonialController implements Controller {
	private readonly validation: Validation;

	constructor(validation: Validation) {
		this.validation = validation;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest.body);
			if (error) {
				return badRequest(error);
			}

			return created("");
		} catch (error) {
			return {
				statusCode: 500,
				body: error
			};
		}
	}
}
