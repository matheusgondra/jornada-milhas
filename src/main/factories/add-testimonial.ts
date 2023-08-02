import { DbAddTestimonial } from "../../data/use-cases";
import { TestimonialRepository } from "../../infra/db/postgresql/testimonial-repository";
import { AddTestimonialController } from "../../presentation/controllers/add-testimonial";
import { NameValidation } from "../../presentation/helpers/validators/name-validation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-fields-validation";
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite";

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
