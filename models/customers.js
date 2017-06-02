module.exports = function(sequelize, DataTypes) {
	var customers = sequelize.define("customers", {
			customer_name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true
				}
			},
			burgers_eaten: {
				type: DataTypes.INTEGER,
				validate: {
					isInt: true
				}
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