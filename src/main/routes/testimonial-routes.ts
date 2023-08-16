import { Router } from "express";
import { adaptRoute } from "../adapters";
import {
	makeAddTestimonial,
	makeLoadTestimonial,
	makeLoadTestimonials
} from "../factories";

export default (router: Router): void => {
	router.post("/depoimentos", adaptRoute(makeAddTestimonial()));
	router.get("/depoimentos", adaptRoute(makeLoadTestimonials()));
	router.get("/depoimentos/:testimonialId", adaptRoute(makeLoadTestimonial()));
};
