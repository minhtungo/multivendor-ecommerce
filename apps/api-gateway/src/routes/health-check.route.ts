import { createApiResponse } from "@/docs/openAPIResponseBuilders";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { handleServiceResponse } from "@repo/server/lib/http-handlers";
import { ServiceResponse } from "@repo/server/lib/service-response";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
	method: "get",
	path: "/health-check",
	tags: ["Health Check"],
	responses: createApiResponse(z.null(), "Success"),
});

healthCheckRouter.get("/", (_req: Request, res: Response) => {
	const serviceResponse = ServiceResponse.success("Service is healthy", null);
	handleServiceResponse(serviceResponse, res);
});
