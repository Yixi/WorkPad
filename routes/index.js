
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'workpad build test' });
};

exports.workpad = function(req, res){
    res.render('workpad', { title: 'workpad test' });
}