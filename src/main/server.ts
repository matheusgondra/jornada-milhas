import app from "./config/app";

const port = 3000;

app.listen(port, () =>
	console.log(`Server is running: http://localhost:${port}`)
);
