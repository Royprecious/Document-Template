import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Page from "./page";


class Document extends Model{
      
    public id!: number;
    public title!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


}

Document.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          }

},
{
    sequelize: sequelize,
    modelName: 'Document',
    tableName: 'documents',
    timestamps: true,
});


Document.hasMany(Page, {foreignKey:"documentId", as:"pages"});
Page.belongsTo(Document,{foreignKey: "documentId", as:"document"});

export default Document;