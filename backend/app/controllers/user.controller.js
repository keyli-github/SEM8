// Controlador que responde a rutas públicas (accesibles sin autenticación)
export const allAccess = (req, res) => {
	res.status(200).send("Public Content.");
};

// Controlador que responde a rutas accesibles solo para usuarios autenticados
export const userBoard = (req, res) => {
	res.status(200).send("User Content.");
};

// Controlador que responde a rutas exclusivas para administradores
export const adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
};

// Controlador que responde a rutas exclusivas para moderadores
export const moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content.");
};
