import type { UserResponse } from "./typeService";

export type stateApp =
  | { status: "success"; data: UserResponse; access_token: string }
  | { status: "idle" }
  | { status: "none" };
export type stateLoad = { status: "idle" } | { status: "load" };
export type stateForm =
  | { status: "login" }
  | { status: "register" }
  | { status: "success"; data: string };
export type stateMessage =
  | { status: "idle" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };
export type stateUser =
  | {
      status: "idle";
      data: UserResponse;
    }
  | { status: "edit" }
  | { status: "delete" }
  | { status: "close" };
