import { FC } from "react";
import RecentProjectsContainer from "./RecentProjectsContainer";
import { fetchUserProjects, fetchUserIssues } from "../../utils/requests";
import { Issue, ProjectType } from "../../types/project";
import { defer } from "react-router-dom";
import RecentTasksContainer from "./RecentIssuesContainer";

const WorkPage: FC = () => {
  return (
    <div className="w-75 my-4 mx-auto text-start">
      <h3 className="mt-3 mb-4">Your work</h3>
      <div className="mx-2">
        <RecentProjectsContainer />
        <RecentTasksContainer />
      </div>
    </div>
  );
};

export default WorkPage;

export type WorkPageLoaderType = {
  userProjects: () => Promise<ProjectType[]>;
  userIssues: () => Promise<Issue[]>;
};

export const workPageLoader = () => {
  return defer({
    userProjects: fetchUserProjects(),
    userIssues: fetchUserIssues(),
  });
};
