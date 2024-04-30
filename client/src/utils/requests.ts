import { USER_PROJECTS_URL } from "../constants";
import { ProjectType } from "../types/project";
import { getToken } from "./auth";

export async function fetchUserProjects() {
  const token = getToken();

  const projectsResponse = await fetch(USER_PROJECTS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!projectsResponse.ok) {
    throw Error("Cannot fetch User Projects!");
  }

  const projectsBody = await projectsResponse.json();
  return projectsBody.data.projects as ProjectType[];
}
