module.exports = function(sequelize, DataTypes) {
	var customers = sequelize.define("customers", {
			customer_name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			burgers_eaten: {
				type: DataTypes.INTEGER
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			}
		}, {
			timestamps: false
	});
	return customers;
}