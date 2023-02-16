const signatureAccess = 'MySuP3R_z3kr3t_access'

export const getTokens = (login: string) => ({
  accessToken: Date.now() + login + signatureAccess,
})
