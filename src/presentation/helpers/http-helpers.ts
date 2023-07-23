import { ServerError } from "../errors";
import { HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => {
	return {
		statusCode: 400,
		body: error
	};
};

export const created = (data: any): HttpResponse => {
	return {
		statusCode: 201,
		body: data
	};
};

export const serverError = (error: Error): HttpResponse => {
	return {
		statusCode: 500,
		body: new ServerError(error.stack as string)
	};
};
