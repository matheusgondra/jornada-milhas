import { InvalidParamError, MissingParamError } from "../../errors";
import { Validation } from "./validation";

export class IdValidation implements Validation {
	validate(input: any): Error | null {
		const id = Number(input.params.testimonialId);
		if (!id) {
			return new MissingParamError("testimonialId");
		}
		if (typeof id !== "number") {
			return new InvalidParamError("testimonialId");
		}
		return null;
	}
}
