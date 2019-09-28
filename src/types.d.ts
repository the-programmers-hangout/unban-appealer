import { Profile } from "passport-discord"

type RefreshableUser = Profile & Refreshable

interface Refreshable {
  refreshToken: string
}
