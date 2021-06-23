const localtunnel = require('localtunnel')

class LocalTunnelPlugin {
  constructor(options = {}) {
    this.PLUGIN_NAME = 'LocalTunnel'
    this.tunnelCreated = false
    this.options = options
    this.border = '-'.repeat(
      process.stdout.columns - (this.PLUGIN_NAME.length + 9), // <i> [LocalTunnel]
    )

    this.apply.bind(this)
    this.generateLog.bind(this)
  }

  generateLog(logger) {
    return (url) => {
      logger.info(this.border)
      logger.info(`tunnel created: ${url}`)
      logger.info(this.border)
    }
  }

  async apply(compiler) {
    if (!compiler.options.devServer || this.tunnelCreated) return

    const logger = compiler.getInfrastructureLogger(this.PLUGIN_NAME)
    const createLog = this.generateLog(logger)

    try {
      this.tunnelCreated = true
      const options = {
        port: compiler.options.devServer.port,
        ...this.options,
      }

      const tunnel = await localtunnel(options)

      if (tunnel.clientId !== options.subdomain) {
        logger.error(
          `tunnel https://${options.subdomain}.loca.it is not available`,
        )
        createLog(tunnel.url)
      } else {
        createLog(tunnel.url)
      }
    } catch (e) {
      this.tunnelCreated = false
      logger.error('can not create tunnel', e)
    }
  }
}

module.exports = LocalTunnelPlugin
