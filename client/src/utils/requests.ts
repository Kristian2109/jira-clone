import { PROJECTS_URL, USER_ISSUES_URL, USER_PROJECTS_URL } from "../constants";
import { HTMLFormMethod } from "../types/forms";
import { IssueCreate } from "../types/issues";
import {
  CreateProject,
  Issue,
  IssueTypeWithFields,
  ProjectType,
  ProjectWithAllData,
  IssueFieldCreate,
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

export async function fetchProjectIssues(projectId: number) {
  const projectIssuesUrl = `${PROJECTS_URL}/${projectId}/issues`;
  const projectIssuesResponse = (await authenticatedRequest(
    projectIssuesUrl
  )) as any;

  return projectIssuesResponse.issues as Issue;
}

export async function fetchProject(projectId: number) {
  const fetchProjectUrl = `${PROJECTS_URL}/${projectId}`;
  const projectResponse = (await authenticatedRequest(fetchProjectUrl)) as any;

  return projectResponse.project as ProjectWithAllData;
}

export const createProject = async (project: CreateProject) => {
  const response = (await authenticatedRequest(PROJECTS_URL, {
    method: "POST",
    body: JSON.stringify(project),
  })) as any;

  return response.project.id;
};

export const createIssueType = async (
  issueType: { name: string; description: string },
  projectId: number
) => {
  const createIssueUrl = `${PROJECTS_URL}/${projectId}/issueTypes`;
  const response = (await authenticatedRequest(createIssueUrl, {
    method: "POST",
    body: JSON.stringify(issueType),
  })) as any;

  return response.newIssueType?.id;
};

export const fetchIssueType = async (
  issueTypeId: number,
  projectId: number
) => {
  const issueTypeUrl = `${PROJECTS_URL}/${projectId}/issueTypes/${issueTypeId}`;

  const issueTypeResponse = (await authenticatedRequest(issueTypeUrl)) as any;

  return issueTypeResponse?.issueType as IssueTypeWithFields;
};

export const createIssueField = async (
  issueTypeId: number,
  projectId: number,
  issueField: IssueFieldCreate
) => {
  const issueFieldCreateUrl = `${PROJECTS_URL}/${projectId}/issueTypes/${issueTypeId}/fields`;

  const createdIssueResponse = (await authenticatedRequest(
    issueFieldCreateUrl,
    {
      method: "POST",
      body: JSON.stringify(issueField),
    }
  )) as any;

  return createdIssueResponse;
};

export const createIssue = async (issue: IssueCreate, projectId: number) => {
  const issueCreateUrl = `${PROJECTS_URL}/${projectId}/issues`;
  console.log(issue);
  const createdIssueResponse = (await authenticatedRequest(issueCreateUrl, {
    method: "POST",
    body: JSON.stringify(issue),
  })) as any;

  return createdIssueResponse.createdIssue.id as number;
};
