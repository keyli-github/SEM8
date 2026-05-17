// app/config/db.config.js
export default {
	HOST: process.env.DB_HOST || "localhost",
	USER: process.env.DB_USER || "root",
	PASSWORD: process.env.DB_PASSWORD || "",
	DB: process.env.DB_NAME || "db",
	PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : (process.env.DB_DIALECT === "postgres" ? 5432 : 3306),
	dialect: process.env.DB_DIALECT || "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	dialectOptions: process.env.DB_DIALECT === "postgres" ? {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		}
	} : {},
};
