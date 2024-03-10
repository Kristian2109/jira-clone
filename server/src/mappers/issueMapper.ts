import Issue from "../entities/issue/issue";
import IssueField from "../entities/issue/issueField";
import IssueFieldContent from "../entities/issue/issueFieldContent";
import IssueType from "../entities/issue/issueType";
import { IssueCreate } from "../types/issue";

export default class IssueMapper {
    public static toEntity(issueToCreate: IssueCreate): Issue {
        const issue = new Issue();
        const issueType = new IssueType()
        issueType.id = issueToCreate.issueTypeId;

        issue.summary = issueToCreate.summary;
        issue.issueType = issueType;
        issue.isCompleted = false;
        issue.fields = [];
        
        issueToCreate.fields?.forEach(field => {
            const issueFieldType = new IssueField();
            issueFieldType.id = field.issueFieldId;
            const issueFieldContent = new IssueFieldContent(issueFieldType, field.content);
            issue.fields.push(issueFieldContent);
        })

        return issue;
    }

}