'use strict'

const User = use('App/Models/User')
const InviteHook = (exports = module.exports = {})
const Kue = use('Kue')
const Job = use('App/Jobs/InvitationEmail')

InviteHook.sendInvitationEmail = async invite => {
  const { email } = invite

  const userExists = await User.findBy('email', email)

  if (userExists) {
    console.log('ASSOCIOU', email)
    await userExists.teams().attach(invite.team_id)
  } else {
    const user = await invite.user().fetch()
    const team = await invite.team().fetch()

    Kue.dispatch(Job.key, { user, team, email }, { attempts: 3 })
  }
}
