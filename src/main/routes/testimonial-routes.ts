import { Router } from "express";
import { adaptRoute } from "../adapters";
import {
	makeAddTestimonial,
	makeDeleteTestimonial,
	makeLoadRandomTestimonials,
	makeLoadTestimonial,
	makeLoadTestimonials,
	makeUpdateTestimonial
} from "../factories";

export default (router: Router): void => {
	router.post("/depoimentos", adaptRoute(makeAddTestimonial()));
	router.get("/depoimentos", adaptRoute(makeLoadTestimonials()));
	router.get("/depoimentos/:testimonialId", adaptRoute(makeLoadTestimonial()));
	router.get("/depoimentos-home", adaptRoute(makeLoadRandomTestimonials()));
	router.patch(
		"/depoimentos/:testimonialId",
		adaptRoute(makeUpdateTestimonial())
	);
	router.delete(
		"/depoimentos/:testimonialId",
		adaptRoute(makeDeleteTestimonial())
	);
};
