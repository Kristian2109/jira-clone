import { PROJECTS_URL, USER_ISSUES_URL, USER_PROJECTS_URL } from "../constants";
import { HTMLFormMethod } from "../types/forms";
import {
  CreateProject,
  Issue,
  ProjectType,
  ProjectWithMembers,
} from "../types/project";
import { getToken } from "./auth";

async function authenticatedRequest<ReturnType>(
  url: string,
  config?: { method: HTMLFormMethod; body: string }
) {
  const token = getToken();

  const response = await fetch(url, {
    ...config,
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
  const end = 5;
  const issuesUrl = `${USER_ISSUES_URL}?begin=${begin}&end=${end}`;

  const issuesResponse = await authenticatedRequest<{ issues: Issue[] }>(
    issuesUrl
  );
  return issuesResponse.issues;
}

export async function fetchProject(projectId: number) {
  const fetchProjectUrl = `${PROJECTS_URL}/${projectId}`;
  const projectResponse = (await authenticatedRequest(fetchProjectUrl)) as any;

  return projectResponse.project as ProjectWithMembers;
}

export const createProject = async (project: CreateProject) => {
  const response = (await authenticatedRequest(PROJECTS_URL, {
    method: "POST",
    body: JSON.stringify(project),
  })) as any;

  return response.project.id;
};
