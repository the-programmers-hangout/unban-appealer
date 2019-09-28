// File meant to be used as a side effect
import { logger } from "./logger"

const REQUIRED_ENV = [
  "APPEALER_UNBAN_SERVER",
  "APPEALER_MAIN_SERVER",
  "APPEALER_CLIENT_ID",
  "APPEALER_CLIENT_SECRET",
  "APPEALER_CALLBACK_URL",
  "APPEALER_BOT_TOKEN",
] as const

const raiseFatalEnvError = (missing: string): never => {
  logger.error(`Missing required env variable "${missing}", exiting bot...`)
  return process.exit(1)
}

const missing = REQUIRED_ENV.find(env => !(env in process.env))

if (missing) {
  raiseFatalEnvError(missing)
}
