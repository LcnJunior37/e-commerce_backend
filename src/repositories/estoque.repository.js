const databaseService = require("../services/database.service");

const findAll = () => {
  return new Promise((resolve, reject) => {
    databaseService.query("SELECT * FROM estoque", (err, results) => {
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
      "SELECT * FROM estoque where idProduto = ?",
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

const create = (estoque) => {
  const est = [(idProduto = estoque.idProduto), (qtd = estoque.qtd)];
  console.log(est);
  return new Promise((resolve, reject) => {
    databaseService.query(
      "INSERT INTO estoque (idProduto, qtd) VALUES (?)",
      [est],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(est);
      }
    );
  });
};

const updateOne = (id, dataToUpdate) => {
  const keys = Object.keys(dataToUpdate);
  const values = Object.values(dataToUpdate);

  const UPDATE = `UPDATE estoque SET `;

  let SET = "";
  keys.forEach((r, index) => {
    SET += `${r} = \'${values[index]}\', `;
  });

  SET = SET.replace(/, $/, " ");

  const WHERE = `WHERE idProduto = ${id}`;

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
      `DELETE FROM estoque WHERE idProduto = ${id}`,
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
