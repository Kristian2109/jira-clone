import Project from "../entities/project";
import { ProjectCreate } from "../types/project";

export default class ProjectMapper {
    public static toProject(projectDTO: ProjectCreate): Project {
        let projectToCreate = new Project();

        projectToCreate.name = projectDTO.name;
        projectToCreate.description = projectDTO.description;
        projectToCreate.key = projectDTO.key;

        return projectToCreate;
    }

}