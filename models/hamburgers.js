module.exports = function(sequelize, DataTypes) {
	var hamburgers = sequelize.define("hamburgers", {
			burger_name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			devoured: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			}
		},
		{
			timestamps: false
	});
	return hamburgers;
}