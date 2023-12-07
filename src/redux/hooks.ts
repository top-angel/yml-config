import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { select } from "redux-saga/effects";
import type { AppState, AppDispatch } from "./store";

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = (selector) =>
  useSelector(selector, shallowEqual);

export function selects<T>(f: (s: AppState) => T) {
  return select((s) => f(s));
}
