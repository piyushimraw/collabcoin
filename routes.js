const routes = require('next-routes');

module.exports = routes()
  .add('/campign/new', '/campign/new')
  .add('/campign/:address', '/campign/show');
