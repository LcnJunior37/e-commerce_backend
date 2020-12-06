const vendaService = require("../services/venda.service");
const express = require("express");
const vendaRouter = express.Router();

vendaRouter.get("/venda", vendaService.findAllVenda);

vendaRouter.get("/venda/:id", vendaService.findVendaById);

vendaRouter.get("/venda/cliente/:id", vendaService.findAllVendaByCliente);

vendaRouter.post("/venda", vendaService.createVenda);

vendaRouter.delete("/venda/:id", vendaService.deleteVenda);

module.exports = vendaRouter;
