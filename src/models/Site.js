'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Site extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Quan hệ giữa các model
        }
    }
    Site.init(
        {
            contentHTML: DataTypes.TEXT('long'),
            contentMarkdown: DataTypes.TEXT('long'),
            name: DataTypes.STRING,
            case: DataTypes.STRING,
            image: DataTypes.BLOB('long'),
        },
        {
            sequelize,
            modelName: 'Site',
        },
    );
    return Site;
};
