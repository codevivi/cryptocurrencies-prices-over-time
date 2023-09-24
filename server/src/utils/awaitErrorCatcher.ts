import { Request, Response, NextFunction } from "express";
import { AsyncRequestHandler } from "../utils/types";

type AwaitErrorCatcher = (callback: AsyncRequestHandler) => AsyncRequestHandler;

const awaitErrorCatcher: AwaitErrorCatcher = (asyncRequestHandler) => {
  const handlerWrapper: AsyncRequestHandler = async (req, res, next) => {
    try {
      await asyncRequestHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return handlerWrapper;
};
export default awaitErrorCatcher;
