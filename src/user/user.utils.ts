import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "./types";

export const getUser = async (token) => {
  try {
    if (!token || typeof token !== "string") {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await client.user.findUnique({ where: { id } });
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const protectResolver =
  (fun: Resolver) => (root, args, context, info) => {
    if (!context.loggedUser) {
      return { ok: false, error: "No user" };
    } else {
      return fun(root, args, context, info);
    }
  };
