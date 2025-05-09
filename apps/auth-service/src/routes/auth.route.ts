import { paths } from '@/configs/paths';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
  VerifyUserSchema,
} from '@/models/auth.model';
import { validateRequest } from '@repo/server/lib/http-handlers';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import z from 'zod';
import { authController } from '@/controllers/auth.controller';
import assertAuthentication from '@/middlewares/assertAuthentication';

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signUp}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: SignUpSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.post(paths.signUp, validateRequest(z.object({ body: SignUpSchema })), authController.signUp);

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signIn}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: SignInSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.post(paths.signIn, validateRequest(z.object({ body: SignInSchema })), authController.signIn);

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.forgotPassword}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ForgotPasswordSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.post(
  paths.forgotPassword,
  validateRequest(z.object({ body: ForgotPasswordSchema })),
  authController.forgotPassword
);

authRegistry.registerPath({
  method: 'put',
  path: `/auth/${paths.verifyUser}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: VerifyUserSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.put(paths.verifyUser, validateRequest(z.object({ body: VerifyUserSchema })), authController.verifyUser);

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.resetPassword}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ResetPasswordSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Success'),
});

authRouter.post(
  paths.resetPassword,
  validateRequest(z.object({ body: ResetPasswordSchema })),
  authController.resetPassword
);

authRegistry.registerPath({
  method: 'put',
  path: `/auth/${paths.renewToken}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.put(paths.renewToken, authController.renewToken);

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signOut}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.post(paths.signOut, authController.signOut);

authRegistry.registerPath({
  method: 'get',
  path: `/auth/${paths.me}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.get(paths.me, assertAuthentication, authController.getMe);
