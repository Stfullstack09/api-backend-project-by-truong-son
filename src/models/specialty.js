'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            specialty.belongsTo(models.Doctor_Infor, {
                foreignKey: 'id',
                targetKey: 'specialtyId',
                as: 'specialtyData',
            });
        }
    }
    specialty.init(
        {
            descriptionMarkDown: DataTypes.TEXT,
            descriptionHTML: DataTypes.TEXT,
            image: DataTypes.BLOB('long'),
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'specialty',
        },
    );
    return specialty;
};
