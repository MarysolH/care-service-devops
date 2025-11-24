const request = require("supertest");
const app = require("../app");

// Mock del modelo Usuario
jest.mock("../models/Usuario", () => ({
  find: jest.fn().mockResolvedValue([
    { nombre: "Juan", apellido: "Pérez", usuario: "jperez", rol: "mecanico" }
  ]),

  create: jest.fn().mockImplementation(async (data) => ({
    _id: "fake-id-123",
    ...data,
    createdAt: "2025-01-01",
  }))
}));

describe("API Usuarios", () => {
  
  // GET /api/usuarios
  it("GET debería devolver status 200 y un array", async () => {
    const res = await request(app).get("/api/usuarios");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST /api/usuarios
  it("POST debería crear un usuario y devolver 201", async () => {
    const nuevoUsuario = {
      nombre: "María",
      apellido: "Gomez",
      usuario: "mgomez",
      rol: "mecanico",
    };

    const res = await request(app)
      .post("/api/usuarios")
      .send(nuevoUsuario);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.nombre).toBe("María");
    expect(res.body.usuario).toBe("mgomez");
  });
});
