import { AppDataSource } from "../config/datasource";
import ProjectViewCategory from "../entities/projectViewCategory";

export default class ViewCategoriesInserted {
    public static async setUpViewCategories() {
        const projectViewCategoryRepository = AppDataSource.getRepository(ProjectViewCategory);

        // Check if any values already exist
        const existingCategories = await projectViewCategoryRepository.find();
        if (existingCategories.length === 0) {
            // Insert initial values only if no values exist already
            const categoriesToAdd = [
                { name: "Board", description: "Canban board for managing team tasks." },
                { name: "Backlog", description: "Scrum based task management." },
                // Add more initial values as needed
            ];
    
            // Insert initial values into the ProjectViewCategory entity
            await projectViewCategoryRepository.insert(categoriesToAdd);
            console.log("Categories Set up!")
        }
    }
}