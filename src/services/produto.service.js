const produtoRepository = require("../repositories/produto.repository");
const estoqueRepository = require("../repositories/estoque.repository");
const findAllproduto = async (req, res) => {
  try {
    let result = await produtoRepository.findAll();
    let i = 0;
    for (i = 0; i < result.length; i++) {
      let est = await estoqueRepository.findById(result[i].idproduto);
      result[i].qtd = est.qtd;
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
const findprodutoById = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await produtoRepository.findById(id);
    let est = await estoqueRepository.findById(id);
    result.qtd = est;
    console.log(est);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
/* const findprodutoByestoque = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await produtoRepository.findByestoque(id);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}; */
//idproduto, nome, descricao, valor, tamanho, peso, digital, tipo
const createproduto = async (req, res) => {
  const requestBody = req.body;
  if (
    requestBody.idproduto &&
    requestBody.nome &&
    requestBody.descricao &&
    requestBody.valor &&
    requestBody.tamanho &&
    requestBody.peso &&
    requestBody.digital &&
    requestBody.tipo &&
    requestBody.qtd
  ) {
    try {
      const prod = {
        idproduto: req.body.idproduto,
        nome: req.body.nome,
        descricao: req.body.descricao,
        valor: req.body.valor,
        tamanho: req.body.tamanho,
        peso: req.body.peso,
        digital: req.body.digital,
        tipo: req.body.tipo,
      };
      const result = await produtoRepository.create(prod);
      const est = {
        idproduto: req.body.idproduto,
        qtd: req.body.qtd,
      };
      const resultEst = await estoqueRepository.create(est);
      result.qtd = est.qtd;
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

const updateproduto = async (req, res) => {
  const requestBody = req.body;
  if (
    requestBody.idproduto ||
    requestBody.nome ||
    requestBody.descricao ||
    requestBody.valor ||
    requestBody.tamanho ||
    requestBody.peso ||
    requestBody.digital ||
    requestBody.tipo
    //requestBody.qtd
  ) {
    try {
      const id = req.params.id;
      const dataToUpdate = requestBody;
      await produtoRepository.updateOne(id, dataToUpdate);

      res.status(200).send(dataToUpdate);
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
const updateEstoqueProduto = async (req, res) => {
  const requestBody = req.body;
  if (requestBody.idproduto || requestBody.qtd) {
    try {
      const id = req.params.id;
      const dataToUpdate = requestBody;
      await estoqueRepository.updateOne(id, dataToUpdate);

      res.status(200).send(dataToUpdate);
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

const deleteproduto = async (req, res) => {
  try {
    const id = req.params.id;
    let mot = await produtoRepository.findById(id);

    await produtoRepository.deleteOne(id);
    await estoqueRepository.deleteOne(id);

    res.send({ msg: `produto com id ${id} deletado.` });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  findAllproduto,
  findprodutoById,
  createproduto,
  updateproduto,
  deleteproduto,
  updateEstoqueProduto,
};
