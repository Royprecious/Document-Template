import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Document from "./document";


class Page extends Model{
      
    public id!: number;
    public documentId!: number;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


}

Page.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        content:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        documentId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: Document, 
                key: 'id' 
              },
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
    modelName: 'Page',
    tableName: 'pages',
    timestamps: true
});




export default Page;