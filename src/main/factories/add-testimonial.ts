import { DbAddTestimonial } from "../../data/use-cases";
import { TestimonialRepository } from "../../infra/db";
import { AddTestimonialController } from "../../presentation/controllers";
import {
	NameValidation,
	RequiredFieldValidation,
	ValidationComposite
} from "../../presentation/helpers";

export const makeAddTestimonial = (): AddTestimonialController => {
	const validations = [
		new RequiredFieldValidation("name"),
		new RequiredFieldValidation("photo"),
		new RequiredFieldValidation("testimonial"),
		new NameValidation("name")
	];
	const validation = new ValidationComposite(validations);
	const addTestimonialRepository = new TestimonialRepository();
	const addTestimonial = new DbAddTestimonial({ addTestimonialRepository });
	return new AddTestimonialController({ validation, addTestimonial });
};
