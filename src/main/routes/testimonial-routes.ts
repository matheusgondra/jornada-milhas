import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeLoadTestimonials } from "../factories/load-testimonials";
import { makeAddTestimonial } from "../factories";

export default (router: Router): void => {
	router.post("/depoimentos", adaptRoute(makeAddTestimonial()));
	router.get("/depoimentos", adaptRoute(makeLoadTestimonials()));
};
