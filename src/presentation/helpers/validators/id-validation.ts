import { InvalidParamError, MissingParamError } from "../../errors";
import { Validation } from "./validation";

export class IdValidation implements Validation {
	validate(input: any): Error | null {
		if (!input) {
			return new MissingParamError("testimonialId");
		}
		if (typeof input !== "number") {
			return new InvalidParamError("testimonialId");
		}
		return null;
	}
}
