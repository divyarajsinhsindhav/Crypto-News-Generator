const DataStore = require('../models/content.models');
const { fetchData } = require('../utils/crypto')
const { gemini } = require('../utils/gemini')

let flag;

exports.showGenrator = async (req, res) => {
    flag=false;
    return res.render('genrator', { flag, userId: req.userId })
}

exports.genrateContent = async (req, res) => {
    const coin = req.body.coin;
    const data = await (fetchData(coin))
    
    const content = await(gemini(data))
    await DataStore.create({ 
        userId: req.userId,
        crypto: coin,
        content: content,
     });
    flag = true
    return res.render('genrator', { content, flag, userId: req.userId })
}


