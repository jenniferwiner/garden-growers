module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/gardengrowers_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/gardengrowers_test',
    debug: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
