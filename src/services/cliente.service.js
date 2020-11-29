const clienteRepository = require("../repositories/cliente.repository");
//const bcrypt = require("bcrypt");
const findAllClientes = async (req, res) => {
  try {
    const result = await clienteRepository.findAll();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const findClienteById = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await clienteRepository.findById(id);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createCliente = async (req, res) => {
  const requestBody = req.body;
  if (
    requestBody.idCliente &&
    requestBody.nome &&
    requestBody.email &&
    requestBody.rua &&
    requestBody.bairro &&
    requestBody.cidade &&
    requestBody.estado &&
    requestBody.numerCasa &&
    requestBody.clienteRepository
  ) {
    //idCliente, nome, email, rua, bairro,cidade, estado, numeroCasa, cep
    try {
      //const senhaEncriptada = encryptPassword(req.body.senha);

      const cli = {
        idCliente: req.body.idCliente,
        nome: req.body.nome,
        email: req.body.email,
        rua: req.body.rua,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.numeroCasa,
        cep: req.body.cep,
      };

      const result = await clienteRepository.create(cli);
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

const updateCliente = async (req, res) => {
  const requestBody = req.body;
  if (
    requestBody.idCliente ||
    requestBody.nome ||
    requestBody.email ||
    requestBody.rua ||
    requestBody.bairro ||
    requestBody.cidade ||
    requestBody.numeroCasa ||
    requestBody.cep
  ) {
    try {
      const id = req.params.id;
      const dataToUpdate = requestBody;
      await clienteRepository.updateOne(id, dataToUpdate);

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

const deleteCliente = async (req, res) => {
  try {
    const id = req.params.id;
    await clienteRepository.deleteOne(id);

    res.send({ msg: `Cliente com id ${id} deletado.` });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  findAllClientes,
  findClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
