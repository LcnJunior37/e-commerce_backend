const databaseService = require("../services/database.service");
const findAll = () => {
  return new Promise((resolve, reject) => {
    databaseService.query("SELECT * FROM venda", (err, results) => {
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
      "SELECT * FROM venda where idvenda = ?",
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
const findByCliente = (id) => {
  return new Promise((resolve, reject) => {
    databaseService.query(
      "SELECT * FROM venda where cliente = ?",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
const create = (venda) => {
  const vend = [
    (idvenda = venda.idvenda),
    (forma_pagamento = venda.forma_pagamento),
    (cliente = venda.cliente),
    (data_venda = venda.valor),
    (valor_total = venda.valorTotal),
  ];
  return new Promise((resolve, reject) => {
    databaseService.query(
      "insert into venda (idVenda, forma_pagamento, cliente, data_venda, valor_total)  VALUES (?)",
      [vend],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(alo);
      }
    );
  });
};
const updateOne = (id, dataToUpdate) => {
  const keys = Object.keys(dataToUpdate);
  const values = Object.values(dataToUpdate);

  const UPDATE = `UPDATE venda SET `;

  let SET = "";
  keys.forEach((r, index) => {
    SET += `${r} = \'${values[index]}\', `;
  });

  SET = SET.replace(/, $/, " ");

  const WHERE = `WHERE idvenda = ${id}`;

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
      `DELETE FROM venda WHERE idvenda = ${id}`,
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
  findByCliente,
};
