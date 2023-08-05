import { LoadTestimonial } from "../../domain";
import { badRequest } from "../helpers/http-helpers";
import { Validation } from "../helpers/validators/validation";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class LoadTestimonialController implements Controller {
	private readonly validation: Validation;
	private readonly loadTestimonial: LoadTestimonial;

	constructor({
		validation,
		loadTestimonial
	}: LoadTestimonialController.Dependencies) {
		this.validation = validation;
		this.loadTestimonial = loadTestimonial;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest);
		if (error) {
			return badRequest(error);
		}

		await this.loadTestimonial.load();

		return {
			statusCode: 200,
			body: ""
		};
	}
}

export namespace LoadTestimonialController {
	export interface Dependencies {
		validation: Validation;
		loadTestimonial: LoadTestimonial;
	}
}
