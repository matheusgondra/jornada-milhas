import { UpdateTestimonial } from "../../domain";
import { Validation, badRequest, success } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class UpdateTestimonialController implements Controller {
	private readonly validation: Validation;
	private readonly updateTestimonial: UpdateTestimonial;

	constructor({
		validation,
		updateTestimonial
	}: UpdateTestimonialController.Dependencies) {
		this.validation = validation;
		this.updateTestimonial = updateTestimonial;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest);
		if (error) {
			return badRequest(error);
		}

		const testimonialId = Number(httpRequest.params.testimonialId);
		const { testimonial, photo } = httpRequest.body;
		await this.updateTestimonial.update({
			testimonialId,
			data: { testimonial, photo }
		});

		return success("");
	}
}

export namespace UpdateTestimonialController {
	export interface Dependencies {
		validation: Validation;
		updateTestimonial: UpdateTestimonial;
	}
}
