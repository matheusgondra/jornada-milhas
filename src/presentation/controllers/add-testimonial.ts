import { AddTestimonial } from "../../domain";
import { badRequest, created } from "../helpers/http-helpers";
import { Validation } from "../helpers/validators/validation";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class AddTestimonialController implements Controller {
	private readonly validation: Validation;
	private readonly addTestimonial: AddTestimonial;

	constructor(validation: Validation, addTestimonial: AddTestimonial) {
		this.validation = validation;
		this.addTestimonial = addTestimonial;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest.body);
			if (error) {
				return badRequest(error);
			}

			this.addTestimonial.add(httpRequest.body);

			return created("");
		} catch (error) {
			return {
				statusCode: 500,
				body: error
			};
		}
	}
}
