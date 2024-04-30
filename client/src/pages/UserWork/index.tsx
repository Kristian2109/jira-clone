import { FC } from "react";
import RecentProjectsContainer from "./RecentProjectsContainer";
import { fetchUserProjects } from "../../utils/requests";
import { ProjectType } from "../../types/project";
import { defer } from "react-router-dom";

const WorkPage: FC = () => {
  return (
    <div className="w-75 my-4 mx-auto text-start">
      <h3>Your work</h3>
      <hr></hr>
      <RecentProjectsContainer />
    </div>
  );
};

export default WorkPage;

export type WorkPageLoaderType = {
  userProjects: () => Promise<ProjectType[]>;
};

export const workPageLoader = () => {
  return defer({
    userProjects: fetchUserProjects(),
  });
};
