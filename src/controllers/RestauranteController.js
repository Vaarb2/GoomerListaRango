const RestauranteService = require('../services/RestauranteService');

module.exports = {
    buscarTodos: async (req, res)=> {
        let json = {error:'', result:[]};

        try {
            let restaurantes = await RestauranteService.buscarTodos();

            
            for(let i in restaurantes){
                json.result.push({
                    id: restaurantes[i].id, 
                    foto: restaurantes[i].foto, 
                    nome: restaurantes[i].nome, 
                    endereco: restaurantes[i].endereco, 
                    horarios_funcionamento: restaurantes[i].horarios_funcionamento 
                });
            }

            res.json(json);
        } catch (error) {
            console.error("Erro ao buscar todos os restaurantes:", error);
            json.error = "Erro ao buscar todos os restaurantes";
            res.status(500).json(json);
        }
    },


    buscarPorId: async (req, res) => {
        let json = {error:'', result:null};

        try {
            let restauranteId = req.params.id;
            let restaurante = await RestauranteService.buscarRestaurantePorId(restauranteId);

            if (restaurante) {
                json.result = restaurante;
                res.json(json);
            } else {
                json.error = "Restaurante não encontrado";
                res.status(404).json(json);
            }
        } catch (error) {
            console.error("Erro ao buscar restaurante por ID:", error);
            json.error = "Erro ao buscar restaurante por ID";
            res.status(500).json(json);
        }
    },

    
    cadastrarRestaurante: async (req, res) => {
        let json = {error:'', result:null};

        try {
            let { foto, nome, endereco, horarios_funcionamento } = req.body;

            if (!foto || !nome || !endereco || !horarios_funcionamento) {
                json.error = "Por favor, forneça todas as informações necessárias para cadastrar o restaurante.";
                return res.status(400).json(json);
            }

            let restauranteId = await RestauranteService.cadastrarRestaurante(foto, nome, endereco, horarios_funcionamento);

            json.result = { id: restauranteId, foto, nome, endereco, horarios_funcionamento };
            res.status(201).json(json); 
        } catch (error) {
            console.error("Erro ao cadastrar restaurante:", error);
            json.error = "Erro ao cadastrar restaurante";
            res.status(500).json(json);
        }
    },


    atualizarRestaurante: async (req, res) => {
        let json = { error: '', result: null };

        try {
            let restauranteId = req.params.id;
            let { foto, nome, endereco, horarios_funcionamento } = req.body;
            let camposAtualizados = {}; 

            
            if (foto) camposAtualizados.foto = foto;
            if (nome) camposAtualizados.nome = nome;
            if (endereco) camposAtualizados.endereco = endereco;
            if (horarios_funcionamento) camposAtualizados.horarios_funcionamento = horarios_funcionamento;

            
            if (Object.keys(camposAtualizados).length === 0) {
                json.error = "Nenhum campo foi fornecido para atualização.";
                return res.status(400).json(json);
            }

            let restauranteAtualizado = await RestauranteService.atualizarRestaurante(restauranteId, camposAtualizados);

            if (restauranteAtualizado) {
                json.result = restauranteAtualizado;
                res.json(json);
            } else {
                json.error = "Restaurante não encontrado";
                res.status(404).json(json);
            }
        } catch (error) {
            console.error("Erro ao atualizar restaurante:", error);
            json.error = "Erro ao atualizar restaurante";
            res.status(500).json(json);
        }
    },


    excluirRestaurante: async (req, res) => {
        let json = { error: '', result: null };

        try {
            let restauranteId = req.params.id;

            let restauranteExcluido = await RestauranteService.excluirRestaurante(restauranteId);

            if (restauranteExcluido) {
                json.result = "Restaurante excluído com sucesso";
                res.json(json);
            } else {
                json.error = "Restaurante não encontrado";
                res.status(404).json(json);
            }
        } catch (error) {
            console.error("Erro ao excluir restaurante:", error);
            json.error = "Erro ao excluir restaurante";
            res.status(500).json(json);
        }
    },


    listarProdutosPorRestaurante: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            let restauranteId = req.params.id;

            let produtos = await RestauranteService.listarProdutosPorRestaurante(restauranteId);

            if (produtos.length > 0) {
                json.result = produtos;
                res.json(json);
            } else {
                json.error = "Nenhum produto encontrado para este restaurante";
                res.status(404).json(json);
            }
        } catch (error) {
            console.error("Erro ao listar produtos por restaurante:", error);
            json.error = "Erro ao listar produtos por restaurante";
            res.status(500).json(json);
        }
    },


    criarProdutoParaRestaurante: async (req, res) => {
        let json = { error: '', result: null };

        try {
            let restauranteId = req.params.id;
            let { foto, nome, preco, categoria } = req.body;

            if (!foto || !nome || !preco || !categoria) {
                json.error = "Por favor, forneça todas as informações necessárias para criar o produto.";
                return res.status(400).json(json);
            }

            let produtoId = await RestauranteService.criarProdutoParaRestaurante(restauranteId, foto, nome, preco, categoria);

            json.result = { id: produtoId, foto, nome, preco, categoria, restaurante_id: restauranteId };
            res.status(201).json(json); 
        } catch (error) {
            console.error("Erro ao criar produto para restaurante:", error);
            json.error = "Erro ao criar produto para restaurante";
            res.status(500).json(json);
        }
    },


    atualizarProdutoDeRestaurante: async (req, res) => {
        let json = { error: '', result: null };

        try {
            let restauranteId = req.params.idRestaurante;
            let produtoId = req.params.idProduto;
            let { foto, nome, preco, categoria } = req.body;

            if (!foto && !nome && !preco && !categoria) {
                json.error = "Por favor, forneça ao menos uma informação para atualizar o produto.";
                return res.status(400).json(json);
            }

            await RestauranteService.atualizarProdutoDeRestaurante(restauranteId, produtoId, foto, nome, preco, categoria);

            json.result = { id: produtoId, foto, nome, preco, categoria, restaurante_id: restauranteId };
            res.json(json);
        } catch (error) {
            console.error("Erro ao atualizar produto de restaurante:", error);
            json.error = "Erro ao atualizar produto de restaurante";
            res.status(500).json(json);
        }
    },


    excluirProdutoDeRestaurante: async (req, res) => {
        let json = { error: '', result: null };

        try {
            let restauranteId = req.params.idRestaurante;
            let produtoId = req.params.idProduto;

            await RestauranteService.excluirProdutoDeRestaurante(restauranteId, produtoId);

            json.result = { message: "Produto excluído com sucesso." };
            res.json(json);
        } catch (error) {
            console.error("Erro ao excluir produto de restaurante:", error);
            json.error = "Erro ao excluir produto de restaurante";
            res.status(500).json(json);
        }
    },


    criarPromocaoParaProduto: async (req, res) => {
        let json = { error: '', result: null };
    
        try {
            let restauranteId = req.params.idRestaurante;
            let produtoId = req.params.idProduto;
            let { descricao, preco_promocional, dias_semana, horario_promocao } = req.body;
    
           
            if (!descricao || !preco_promocional || !dias_semana || !horario_promocao) {
                json.error = "Por favor, forneça todas as informações necessárias para criar a promoção.";
                return res.status(400).json(json);
            }
    
            
            let produtoExiste = await RestauranteService.verificarProdutoExistente(produtoId);
    
            if (!produtoExiste) {
                json.error = "Produto não encontrado";
                return res.status(404).json(json);
            }
    
            
            let promocaoId = await RestauranteService.criarPromocaoParaProduto(produtoId, descricao, preco_promocional, dias_semana, horario_promocao);
    
            json.result = { id: promocaoId, descricao, preco_promocional, dias_semana, horario_promocao, produto_id: produtoId };
            res.status(201).json(json);
        } catch (error) {
            console.error("Erro ao criar promoção para produto:", error);
            json.error = "Erro ao criar promoção para produto";
            res.status(500).json(json);
        }
    }
};

