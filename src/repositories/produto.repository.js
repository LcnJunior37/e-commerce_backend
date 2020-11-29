const databaseService = require("../services/database.service");
const findAll = () => {
  return new Promise((resolve, reject) => {
    databaseService.query("SELECT * FROM produto", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
const findById = (id) => {
  return new Promise((resolve, reject) => {
    databaseService.query(
      "SELECT * FROM produto where idproduto = ?",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

const create = (produto) => {
  const prod = [
    (idProduto = produto.idproduto),
    (nome = produto.nome),
    (desc = produto.descricao),
    (valor = produto.valor),
    (tamanho = produto.tamanho),
    (peso = produto.peso),
    (digital = produto.digital),
    (tipo = produto.tipo),
  ];
  return new Promise((resolve, reject) => {
    databaseService.query(
      "insert into produto (idproduto, nome, descricao, valor, tamanho, peso, digital, tipo)  VALUES (?)",
      [prod],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(mot);
      }
    );
  });
};
const updateOne = (id, dataToUpdate) => {
  const keys = Object.keys(dataToUpdate);
  const values = Object.values(dataToUpdate);

  const UPDATE = `UPDATE produto SET `;

  let SET = "";
  keys.forEach((r, index) => {
    SET += `${r} = \'${values[index]}\', `;
  });

  SET = SET.replace(/, $/, " ");

  const WHERE = `WHERE idproduto = ${id}`;

  const sqlQuery = UPDATE + SET + WHERE;

  return new Promise((resolve, reject) => {
    databaseService.query(sqlQuery, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(dataToUpdate);
    });
  });
};
const deleteOne = async (id) => {
  return new Promise((resolve, reject) => {
    databaseService.query(
      `DELETE FROM produto WHERE idproduto = ${id}`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(id);
      }
    );
  });
};
module.exports = {
  findAll,
  findById,
  create,
  updateOne,
  deleteOne,
  findByEndereco,
};
