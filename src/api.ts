import { Application, Request, Response } from "express"
import passport from "passport"

// const handleLogin = (req: Request, res: Response) => {}

export const setupServer = (app: Application) => {
  app.get("/callback", passport.authenticate("discord"))
  app.get("/login", passport.authenticate("discord"))
  app.get("/user", (req, res) => {
    res.send(req.user)
  })
  return app
}
