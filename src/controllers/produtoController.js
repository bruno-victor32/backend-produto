// Define a utilização do model PRODUTO e a dependência http-status
const Produto = require('../models/produto');
const status = require('http-status');
 
// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nomeProduto = req.body.nomeProduto;
    const descricaoProduto = req.body.descricaoProduto;
    const preco = req.body.preco;
    const quantidadeEstoque = req.body.quantidadeEstoque;
    const datadeCompra = req.body.datadeCompra;
    const ativo = req.body.ativo;
 
    // Popula cada um dos campos do model com os campos recebido na request
    Produto.create({
        nomeProduto: nomeProduto,
        descricaoProduto: descricaoProduto,
        preco: preco,
        quantidadeEstoque: quantidadeEstoque,
        datadeCompra: datadeCompra,
        ativo: ativo,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
 
exports.SelectAll = (req, res, next) => {
    Produto.findAll()
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nomeProduto = req.body.nomeProduto;
    const descricaoProduto = req.body.descricaoProduto;
    const preco = req.body.preco;
    const quantidadeEstoque = req.body.quantidadeEstoque;
    const datadeCompra = req.body.datadeCompra;
    const ativo = req.body.ativo;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.update({
                    nomeProduto: nomeProduto,
                    descricaoProduto: descricaoProduto,
                    preco: preco,
                    quantidadeEstoque: quantidadeEstoque,
                    datadeCompra: datadeCompra,
                    ativo: ativo
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
