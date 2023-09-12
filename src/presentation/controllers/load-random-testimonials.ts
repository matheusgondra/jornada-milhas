import { LoadRandomTestimonials } from "../../domain";
import { serverError } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class LoadRandomTestimonialsController implements Controller {
	private readonly loadRandomTestimonials: LoadRandomTestimonials;

	constructor({
		loadRandomTestimonials
	}: LoadRandomTestimonialsController.Dependencies) {
		this.loadRandomTestimonials = loadRandomTestimonials;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			await this.loadRandomTestimonials.load();

			return {
				statusCode: 200,
				body: []
			};
		} catch (error) {
			return serverError(error as Error);
		}
	}
}

export namespace LoadRandomTestimonialsController {
	export interface Dependencies {
		loadRandomTestimonials: LoadRandomTestimonials;
	}
}
