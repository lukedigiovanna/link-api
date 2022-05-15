import { Router } from "express";

export default interface RouteSource {
    path: string; // endpoint
    router: Router; // associate endpoint with function
}