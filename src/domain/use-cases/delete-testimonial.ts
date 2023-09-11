export interface DeleteTestimonial {
	delete: (id: DeleteTestimonial.Params) => Promise<DeleteTestimonial.Result>;
}

export namespace DeleteTestimonial {
	export type Params = number;
	export type Result = boolean;
}
