import { Router } from "express";
import { makeAddTestimonial } from "../factories";
import { adaptRoute } from "../adapters/express-router-adapter";

export default (router: Router): void => {
	router.post("/depoimentos", adaptRoute(makeAddTestimonial()));
};
