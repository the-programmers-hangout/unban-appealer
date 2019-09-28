/// <reference path="./types.d.ts" />
import "dotenv/config"
import "./startup_checks"
import express from "express"
import { logger } from "./logger"
import { setupServer } from "./api"
import { Strategy as DiscordStrategy, Profile } from "passport-discord"
import passport from "passport"
import { Client } from "discord.js"
import session from "express-session"

const strategy = new DiscordStrategy(
  {
    clientID: process.env.APPEALER_CLIENT_ID!,
    clientSecret: process.env.APPEALER_CLIENT_SECRET!,
    callbackURL: process.env.APPEALER_CALLBACK_URL!,
  },
  (_, refreshToken, profile: Profile, cb) => {
    cb(null, { ...profile, refreshToken })
  }
)

passport.use(strategy)
passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((id, done) => done(null, id))

const main = async () => {
  const app = express()
  app.use(
    session({
      secret: "example-change-later",
      resave: false,
      name: "tph-uba",
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  const bot = new Client()
  setupServer(app)
  logger.info("App starting...")
  await bot.login(process.env.APPEALER_BOT_TOKEN!)
  app.listen(process.env.APPEALER_PORT || "1234")
}

main()
