import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeLoadTestimonials } from "../factories/load-testimonials";

export default (router: Router): void => {
	router.get("/depoimentos", adaptRoute(makeLoadTestimonials()));
};
