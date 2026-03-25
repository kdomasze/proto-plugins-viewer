import { index, prefix, type RouteConfig } from "@react-router/dev/routes";

export default [
    ...prefix("proto-plugins-viewer", [
        index("routes/home.tsx")
    ])
] satisfies RouteConfig;
