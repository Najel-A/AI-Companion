import { api } from "../../services/api";
import type { Project } from "./types";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listProjects: builder.query<Project[], void>({
      query: () => "/api/projects",
      providesTags: ["Project"],
    }),
  }),
});

export const { useListProjectsQuery } = projectApi;
