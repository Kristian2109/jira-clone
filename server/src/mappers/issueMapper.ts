import Issue from "../entities/issue/issue";
import IssueField from "../entities/issue/issueField";
import IssueFieldContent from "../entities/issue/issueFieldContent";
import IssueType from "../entities/issue/issueType";
import { IssueCreate } from "../types/issue";

export default class IssueMapper {
    public static toEntity(issueToCreate: IssueCreate): Issue {
        const issue = new Issue();

        issue.summary = issueToCreate.summary;
        issue.isCompleted = false;

        return issue;
    }

}