'use strict'

const User = use('App/Models/User')
const InviteHook = (exports = module.exports = {})

InviteHook.sendInvitationEmail = async invite => {
  const { email } = invite

  const userExists = await User.findBy('email', email)

  if (userExists) {
    console.log('ASSOCIOU', email)
    await userExists.teams().attach(invite.team_id)
  } else {
    console.log('CRIAR CONTA', email)
  }
}
