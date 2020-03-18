// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
  })
const mongoose = require('mongoose')
const routes = require('./routes')
//connect to database
mongoose.connect('mongodb://localhost/mycargarage')
  .then(()=> console.log('MongoDb Connected...'))
  .catch(err => console.err(err))
  // Declare a route
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })


routes.forEach((route, index) => {
 fastify.route(route)
})
  
  // Run the server!
  const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()