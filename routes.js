const routes = require('next-routes');

module.exports = routes()
  .add('/campign/new', '/campign/new')
  .add('/campign/show', '/campign/show')
  .add('/campign/show/requests', '/campign/requests');
