const db = require('../db');

module.exports = {
    buscarTodos: async () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM restaurantes', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    buscarRestaurantePorId: async (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM restaurantes WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]); 
                    } else {
                        resolve(null); 
                    }
                }
            });
        });
    },

    cadastrarRestaurante: async (foto, nome, endereco, horarios_funcionamento) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO restaurantes (foto, nome, endereco, horarios_funcionamento) VALUES (?, ?, ?, ?)', [foto, nome, endereco, horarios_funcionamento], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },

    atualizarRestaurante: async (restauranteId, camposAtualizados) => {
        let sql = 'UPDATE restaurantes SET ';
        let params = [];
        let values = [];

        
        for (let campo in camposAtualizados) {
            sql += `${campo} = ?, `;
            params.push(camposAtualizados[campo]);
            values.push(campo);
        }

        sql = sql.slice(0, -2); 
        sql += ' WHERE id = ?';
        params.push(restauranteId);

        return new Promise((resolve, reject) => {
            db.query(sql, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows > 0 ? camposAtualizados : null);
                }
            });
        });
    },


    excluirRestaurante: async (restauranteId) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM restaurantes WHERE id = ?', [restauranteId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    },


    listarProdutosPorRestaurante: async (restauranteId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM produtos WHERE restaurante_id = ?', [restauranteId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },


    criarProdutoParaRestaurante: async (restauranteId, foto, nome, preco, categoria) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO produtos (foto, nome, preco, categoria, restaurante_id) VALUES (?, ?, ?, ?, ?)', [foto, nome, preco, categoria, restauranteId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },



    atualizarProdutoDeRestaurante: async (restauranteId, produtoId, foto, nome, preco, categoria) => {
        return new Promise((resolve, reject) => {
            let updateQuery = 'UPDATE produtos SET ';
            let updateValues = [];
            let updates = [];

            if (foto) {
                updates.push('foto = ?');
                updateValues.push(foto);
            }
            if (nome) {
                updates.push('nome = ?');
                updateValues.push(nome);
            }
            if (preco) {
                updates.push('preco = ?');
                updateValues.push(preco);
            }
            if (categoria) {
                updates.push('categoria = ?');
                updateValues.push(categoria);
            }

            if (updates.length === 0) {
                reject("Nenhum campo para atualizar fornecido.");
            }

            updateQuery += updates.join(', ') + ' WHERE id = ? AND restaurante_id = ?';
            updateValues.push(produtoId, restauranteId);

            db.query(updateQuery, updateValues, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    },


    excluirProdutoDeRestaurante: async (restauranteId, produtoId) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM produtos WHERE id = ? AND restaurante_id = ?', [produtoId, restauranteId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    },


    criarPromocaoParaProduto: async (produtoId, descricao, preco_promocional, dias_semana, horario_promocao) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO promocoes (descricao, preco_promocional, dias_semana, horario_promocao, produto_id) VALUES (?, ?, ?, ?, ?)', [descricao, preco_promocional, dias_semana, horario_promocao, produtoId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },


    verificarProdutoExistente: async (produtoId) => {
        console.log(produtoId)
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS count FROM produtos WHERE id = ?', [produtoId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0].count > 0);
                }
            });
        });
    }
};



