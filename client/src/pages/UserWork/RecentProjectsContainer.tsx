import { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ProjectType } from "../../types/project";
import { WorkPageLoaderType } from ".";

const RecentProjectsContainer: FC = () => {
  const { userProjects } = useLoaderData() as WorkPageLoaderType;

  return (
    <div>
      <Suspense fallback={<p>Loading Projects</p>}>
        <Await
          resolve={userProjects}
          errorElement={<p>Error while loading projects.</p>}
        >
          {(projects: ProjectType[]) =>
            projects.map((project: ProjectType) => {
              return <p>{project.name}</p>;
            })
          }
        </Await>
      </Suspense>
    </div>
  );
};

export default RecentProjectsContainer;
