import IssueType from "../entities/issue/issueType";
import Project from "../entities/project/project";
import { NameAndDescription, ProjectCreate } from "../types/project";

export default class IssueTypeMapper {
    public static toIssueType(issueTypeToCreate: NameAndDescription): IssueType {
        let issueToCreate = new IssueType();

        issueToCreate.name = issueTypeToCreate.name;
        issueToCreate.description = issueTypeToCreate.description;

        return issueToCreate;
    }

}