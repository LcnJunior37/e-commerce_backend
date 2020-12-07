const databaseService = require("../services/database.service");

const findAll = () => {
  return new Promise((resolve, reject) => {
    databaseService.query("SELECT * FROM cliente", (err, results) => {
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
      "SELECT * FROM cliente where idCliente = ?",
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

const create = (cliente) => {
  const cli = [
    (idCliente = cliente.idCliente),
    (nome = cliente.nome),
    (email = cliente.email),
    (rua = cliente.rua),
    (bairro = cliente.bairro),
    (cidade = cliente.cidade),
    (estado = cliente.estado),
    (numeroCasa = cliente.numeroCasa),
    (cep = cliente.cep),
  ];
  return new Promise((resolve, reject) => {
    //insert into cliente (idCliente, nome, email, rua, bairro,cidade, estado, numeroCasa, cep)
    databaseService.query(
      "INSERT INTO cliente (idCliente, nome, email, rua, bairro, cidade, estado, numeroCasa, cep) VALUES (?)",
      [cli],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(cli);
      }
    );
  });
};

const updateOne = (id, dataToUpdate) => {
  const keys = Object.keys(dataToUpdate);
  const values = Object.values(dataToUpdate);

  const UPDATE = `UPDATE cliente SET `;

  let SET = "";
  keys.forEach((r, index) => {
    SET += `${r} = \'${values[index]}\', `;
  });

  SET = SET.replace(/, $/, " ");

  const WHERE = `WHERE idCliente = ${id}`;

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
      `DELETE FROM cliente WHERE idCliente = ${id}`,
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
};
