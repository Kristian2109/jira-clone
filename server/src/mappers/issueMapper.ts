import Issue from "../entities/issue/issue";
import IssueField from "../entities/issue/issueField";
import IssueFieldContent from "../entities/issue/issueFieldContent";
import IssueType from "../entities/issue/issueType";
import Project from "../entities/project/project";
import { IssueCreate, IssueFieldCreate } from "../types/issue";
import { NameAndDescription, ProjectCreate } from "../types/project";

export default class IssueMapper {
    public static toEntity(issueToCreate: IssueCreate): Issue {
        const issue = new Issue();
        const issueType = new IssueType()
        issueType.id = issueToCreate.issueTypeId;

        issue.summary = issueToCreate.summary;
        issue.issueType = issueType;
        issue.fields = [];
        
        issueToCreate.fields?.forEach(field => {
            const issueFieldContent = new IssueFieldContent();
            const issueFieldType = new IssueField();
            issueFieldType.id = field.issueFieldId;

            issueFieldContent.content = field.content;
            issueFieldContent.issueField = issueFieldType;
            issue.fields.push(issueFieldContent);
        })

        return issue;
    }

}