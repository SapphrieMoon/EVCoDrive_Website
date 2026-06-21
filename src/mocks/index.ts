import MockAdapter from "axios-mock-adapter";
import http from "@/utils/http";
import { setupMockHandlers } from "./handlers";

// Initialize the mock adapter on our axios instance
const mock = new MockAdapter(http, {
  delayResponse: 400, // simulate 400ms network delay
  onNoMatch: "passthrough", // let unhandled requests pass through to actual endpoints
});

setupMockHandlers(mock);

console.log("%c[EVCoDrive Mock API] Intercepting HTTP requests with mock data...", "color: #3b82f6; font-weight: bold; font-size: 1.1em;");
