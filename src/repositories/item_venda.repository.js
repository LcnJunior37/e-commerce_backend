const databaseService = require("../services/database.service");
const findAll = () => {
  return new Promise((resolve, reject) => {
    databaseService.query("SELECT * FROM item_venda", (err, results) => {
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
      "SELECT * FROM item_venda where iditem_venda = ?",
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
const findByVenda = (id) => {
  return new Promise((resolve, reject) => {
    databaseService.query(
      "SELECT * FROM item_venda where idvenda = ?",
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

const create = (itemVenda) => {
  const iVend = [
    (iditem_venda = itemVenda.iditem_venda),
    (item_produto = itemVenda.item_produto),
    (qtd_item = itemVenda.qtd_item),
    (idVenda = itemVenda.idvenda),
  ];
  return new Promise((resolve, reject) => {
    databaseService.query(
      "insert into item_venda (iditem_venda,item_produto,qtd_item,idvenda)  VALUES (?)",
      [iVend],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(iVend);
      }
    );
  });
};
const updateOne = (id, dataToUpdate) => {
  const keys = Object.keys(dataToUpdate);
  const values = Object.values(dataToUpdate);

  const UPDATE = `UPDATE item_venda SET `;

  let SET = "";
  keys.forEach((r, index) => {
    SET += `${r} = \'${values[index]}\', `;
  });

  SET = SET.replace(/, $/, " ");

  const WHERE = `WHERE iditem_venda = ${id}`;

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
      `DELETE FROM item_venda WHERE iditem_venda = ${id}`,
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
  findByVenda,
};
