const produtoService = require("../services/produto.service");
const express = require("express");
const produtoRouter = express.Router();

produtoRouter.get("/produto", produtoService.findAllproduto);

produtoRouter.get("/produto/:id", produtoService.findprodutoById);

produtoRouter.post("/produto", produtoService.createproduto);

produtoRouter.put("/produto/:id", produtoService.updateproduto);

produtoRouter.delete("/produto/:id", produtoService.deleteproduto);

produtoRouter.put("/produto/estoque/:id", produtoService.updateEstoqueProduto);

module.exports = produtoRouter;
