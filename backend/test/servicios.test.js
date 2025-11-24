const request = require("supertest");
const app = require("../app");

// Mock del modelo Servicio
jest.mock("../models/Servicios", () => ({
  find: jest.fn().mockResolvedValue([
    { _id: "1", nombre: "Cambio de aceite", precio: 15000 }
  ]),

  create: jest.fn().mockImplementation(async (data) => ({
    _id: "new123",
    ...data
  })),

  findByIdAndUpdate: jest.fn().mockImplementation(async (id, data) => ({
    _id: id,
    ...data
  })),

  findByIdAndDelete: jest.fn().mockResolvedValue(true)
}));

describe("API Servicios", () => {

  // GET /api/servicios
  it("GET debería devolver status 200 y un array", async () => {
    const res = await request(app).get("/api/servicios");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST /api/servicios
  it("POST debería crear un servicio y devolver 201", async () => {
    const nuevoServicio = {
      nombre: "Alineación",
      precio: 25000
    };

    const res = await request(app)
      .post("/api/servicios")
      .send(nuevoServicio);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.nombre).toBe("Alineación");
    expect(res.body.precio).toBe(25000);
  });

  // PUT /api/servicios/:id
  it("PUT debería actualizar un servicio y devolver el objeto actualizado", async () => {
    const servicioActualizado = {
      nombre: "Balanceo",
      precio: 18000
    };

    const res = await request(app)
      .put("/api/servicios/123")
      .send(servicioActualizado);

    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe("Balanceo");
    expect(res.body.precio).toBe(18000);
  });

  // DELETE /api/servicios/:id
  it("DELETE debería eliminar un servicio y devolver mensaje OK", async () => {
    const res = await request(app).delete("/api/servicios/123");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje");
    expect(res.body.mensaje).toBe("Servicio eliminado correctamente");
  });

});
