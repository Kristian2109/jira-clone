import { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ProjectType } from "../../types/project";
import { WorkPageLoaderType } from ".";
import RecentProject from "./RecentProject";
import { Link } from "react-router-dom";

const RecentProjectsContainer: FC = () => {
  const { userProjects } = useLoaderData() as WorkPageLoaderType;

  return (
    <>
      <div className="d-flex justify-content-between mx-2 mb-2">
        <h6 className="mb-0">Recent Projects</h6>
        <Link
          className="link-underline-opacity-0 link-underline-opacity-75-hover"
          to="create"
        >
          Create Project
        </Link>
      </div>
      <div className="d-flex">
        <Suspense fallback={<p>Loading Projects</p>}>
          <Await
            resolve={userProjects}
            errorElement={<p>Error while loading projects.</p>}
          >
            {(projects: ProjectType[]) =>
              projects.map((project: ProjectType) => {
                return <RecentProject key={project.id} project={project} />;
              })
            }
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default RecentProjectsContainer;
