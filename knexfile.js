module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/gardengrowers_test',
    debug: false
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/gardengrowers_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
