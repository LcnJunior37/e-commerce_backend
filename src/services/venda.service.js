const item_vendaRepository = require("../repositories/item_venda.repository");
const vendaRepository = require("../repositories/venda.repository");
const clienteRepository = require("../repositories/cliente.repository");
const produtoRepository = require("../repositories/produto.repository");
const estoqueRepository = require("../repositories/estoque.repository");

const findAllVenda = async (req, res) => {
  try {
    let result = await vendaRepository.findAll();
    let i = 0;
    for (i = 0; i < result.length; i++) {
      let cli = await clienteRepository.findById(result[i].cliente);
      let itens = await item_vendaRepository.findByVenda(result[i].idvenda);
      // let j;
      // for (j = 0; i < itens.length; j++) {
      //   let prod = await produtoRepository.findById(itens[i].item_produto);
      //   itens[j].item_produto = prod;
      // }
      result[i].cliente = cli;
      result[i].itens = itens;
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const findAllVendaByCliente = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await vendaRepository.findByCliente(id);
    let i = 0;
    for (i = 0; i < result.length; i++) {
      let cli = await clienteRepository.findById(result[i].cliente);
      let itens = await item_vendaRepository.findByVenda(result[i].idvenda);
      let j;
      // for (j = 0; i < itens.length; j++) {
      //   let prod = await produtoRepository.findById(itens[i].item_produto);
      //   itens[j].item_produto = prod;
      // }
      result[i].cliente = cli;
      result[i].itens = itens;
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
const findVendaById = async (req, res) => {
  try {
    let result = await vendaRepository.findByCliente(id);
    let i = 0;
    for (i = 0; i < result.length; i++) {
      let cli = await clienteRepository.findById(result[i].cliente);
      let itens = await item_vendaRepository.findByVenda(result[i].idvenda);
      let j;
      for (j = 0; i < itens.length; j++) {
        console.log(itens[i].item_produto);
        let prod = await produtoRepository.findById(itens[i].item_produto);
        itens[j].item_produto = prod;
      }
      result[i].cliente = cli;
      result[i].itens = itens;
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createVenda = async (req, res) => {
  const venda = req.body;
  if (
    venda.idvenda &&
    venda.cliente &&
    venda.forma_pagamento &&
    //venda.data_venda &&
    venda.valor_total
  ) {
    try {
      const vend = {
        idvenda: venda.idvenda,
        cliente: venda.cliente,
        forma_pagamento: venda.forma_pagamento,
        data_venda: venda.data_venda,
        valor_total: venda.valor_total,
      };

      const result = await vendaRepository.create(vend);
      let arrayitens = new Array();
      let i;
      for (i = 0; i < venda.itens.length; i++) {
        let item = {
          iditem_venda: venda.itens[i].iditem_venda,
          item_produto: venda.itens[i].item_produto,
          qtd_item: venda.itens[i].qtd_item,
          idvenda: venda.idvenda,
        };
        console.log(item);
        let it = await item_vendaRepository.create(item);
        arrayitens.push(item);
      }
      result.itens = arrayitens;

      res.send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  } else {
    res.status(400).send({
      error: "Campos Faltando",
    });
  }
};

const deleteVenda = async (req, res) => {
  try {
    const id = req.params.id;
    await item_vendaRepository.deleteOne(id);

    await vendaRepository.deleteOne(id);

    res.send({ msg: `Venda com id ${id} deletada.` });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  findAllVenda,
  findVendaById,
  createVenda,
  deleteVenda,
  findAllVendaByCliente,
};
