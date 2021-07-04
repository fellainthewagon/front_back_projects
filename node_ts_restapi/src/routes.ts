import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  InvalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import {
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  getPostHandler,
} from "./controller/post.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "./schema/post.schema";

/**
 * ENDPOINTS
 *
 */

export default function (app: Express) {
  /**
   *    POST Registration
   */
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  /**
   *    POST Login
   */
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  /**
   *    GET User's sessions
   */
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  /**
   *    DELETE Logout
   */
  app.delete("/api/sessions", requiresUser, InvalidateUserSessionHandler);

  /**
   *    POST Create a post
   */
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  /**
   *    PUT Update a post
   */
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  /**
   *    GET Get a post
   */
  app.get("/api/posts/:postId", getPostHandler);

  /**
   *    DELETE Delete a post
   */
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );
}
