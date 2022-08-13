'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clinnic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            clinnic.hasMany(models.Doctor_Infor, {
                foreignKey: 'id',
                targetKey: 'keyMap',
                as: 'clinicData',
            });
        }
    }
    clinnic.init(
        {
            address: DataTypes.STRING,
            descriptionMarkDown: DataTypes.TEXT,
            descriptionHTML: DataTypes.TEXT,
            image: DataTypes.BLOB('long'),
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'clinnic',
        },
    );
    return clinnic;
};
