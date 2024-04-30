import { USER_ISSUES_URL, USER_PROJECTS_URL } from "../constants";
import { Issue, ProjectType } from "../types/project";
import { getToken } from "./auth";

async function genericGetRequest<ReturnType>(url: string) {
  const token = getToken();

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = (await response.json()).error;
    if (error) {
      throw new Error(error);
    } else {
      throw new Error("Error while loading data!");
    }
  }

  const data = await response.json();
  return data.data as ReturnType;
}

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

export async function fetchUserIssues() {
  const begin = 0;
  const end = 10;
  const issuesUrl = `${USER_ISSUES_URL}?begin=${begin}&end=${end}`;

  const issuesResponse = await genericGetRequest<{ issues: Issue[] }>(
    issuesUrl
  );
  return issuesResponse.issues;
}
