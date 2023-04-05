import { connectDB } from '#Config/db.js';
import '#Config/env.js';
import httpServer from '#Config/http.js';

const PORT = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || 'development';
const connectionString =
	environment === 'production'
		? process.env.MONGODB_URI_PRO
		: process.env.MONGODB_URI_DEV;

const bootstrap = async () => {
	await connectDB(connectionString);

	httpServer.listen(PORT, () => {
		console.log(`Server running on port ${PORT} (${environment})`);
	});
};

bootstrap();
