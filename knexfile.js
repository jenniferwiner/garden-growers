module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/gardengrowers_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
