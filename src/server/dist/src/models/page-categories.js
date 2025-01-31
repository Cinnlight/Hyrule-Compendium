import { Model, DataTypes } from "sequelize";
export class PageCategories extends Model {
}
export function PageCategoryFactory(sequelize) {
    PageCategories.init({
        page_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Pages',
                key: 'id'
            },
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Categories',
                key: 'id'
            },
        },
        key: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
    }, {
        modelName: "PageCategories",
        tableName: "Page Categories",
        timestamps: false,
        sequelize,
    });
    return PageCategories;
}
