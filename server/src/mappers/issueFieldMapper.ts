import IssueField from "../entities/issue/issueField";
import { IssueFieldCreate } from "../types/issue";

export default class IssueFieldMapper {
    public static toEntity(issueFieldToCreate: IssueFieldCreate): IssueField {
        let fieldToCreate = new IssueField();

        fieldToCreate.name = issueFieldToCreate.name;
        fieldToCreate.description = issueFieldToCreate.description;
        fieldToCreate.orderNumber = issueFieldToCreate.orderNumber;
        fieldToCreate.dataType = issueFieldToCreate.dataType;

        return fieldToCreate;
    }

}